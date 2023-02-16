import { SupportedChainIds } from '@/constants/chains'
import {
    GasTankType,
    IBase,
    IGasTank,
    IProject,
    NewGasTank,
    NewProject,
    ProjectApiType,
} from '@/types'
import axios from 'axios'
import { backendUrl } from './constants'
import { isEqual, difference } from 'lodash'

export async function createNewProject(
    ownerAndWebHookAttributes: IBase,
    projectName: string,
    domains: string[]
): Promise<string> {
    const newProject: NewProject = {
        name: projectName,
        allowedOrigins: domains,
        ...ownerAndWebHookAttributes,
    }
    const {
        data: { projectId },
    } = await axios.post<{ projectId: string }>(
        `${backendUrl}/api/dashboard/project`,
        newProject
    )
    return projectId
}

export async function createGasTank(
    ownerAndWebHookAttributes: IBase,
    projectId: string,
    chainId: SupportedChainIds,
    contracts: string[]
): Promise<GasTankType> {
    const newGasTank: NewGasTank = {
        chainId,
        whitelist: contracts,
        ...ownerAndWebHookAttributes,
    }
    const { data: gasTank } = await axios.post<GasTankType>(
        `${backendUrl}/api/dashboard/project/${projectId}/gasTank`,
        newGasTank
    )
    return gasTank
}

export async function createGasTanks(
    ownerAndWebHookAttributes: IBase,
    projectId: string,
    contracts: string[],
    contractsNetworks: Array<SupportedChainIds>
): Promise<GasTankType[]> {
    // Create a map of chainId to contracts
    const chainToContracts = contractsNetworks.reduce((acc, chainId, index) => {
        if (!acc[chainId]) {
            acc[chainId] = []
        }
        acc[chainId].push(contracts[index])
        return acc
    }, {} as Record<SupportedChainIds, string[]>)

    console.log(chainToContracts)

    // Create gas tanks
    const promises = Object.keys(chainToContracts).map((chainId) => {
        const chainIdFixed = chainId as unknown as SupportedChainIds
        console.log(chainIdFixed)
        return createGasTank(
            ownerAndWebHookAttributes,
            projectId,
            chainIdFixed,
            chainToContracts[chainIdFixed]
        )
    })
    const gasTanks = await Promise.all(promises)
    console.log(gasTanks)
    return gasTanks
}

interface CreateNewProjectWithGasTanksResponse {
    projectId: string
    gasTanks: GasTankType[]
}

export async function createNewProjectWithGasTanks(
    ownerAndWebHookAttributes: IBase,
    projectName: string,
    contracts: string[],
    contractsNetworks: Array<SupportedChainIds>,
    domains: string[]
): Promise<CreateNewProjectWithGasTanksResponse> {
    const newProjectId = await createNewProject(
        ownerAndWebHookAttributes,
        projectName,
        domains
    )
    const gasTanks = await createGasTanks(
        ownerAndWebHookAttributes,
        newProjectId,
        contracts,
        contractsNetworks
    )
    return {
        projectId: newProjectId,
        gasTanks,
    }
}

function reduceContractsAndNetworksLists(
    newContracts: string[],
    contractsNetworks: Array<SupportedChainIds>
) {
    const chainToContracts = contractsNetworks.reduce((acc, chainId, index) => {
        if (!acc[chainId]) {
            acc[chainId] = []
        }
        acc[chainId].push(newContracts[index])
        return acc
    }, {} as Record<SupportedChainIds, string[]>)

    return chainToContracts
}

function reduceContractsAndNetworksProject(project: IProject) {
    const chainToContracts = project.gasTanks.reduce((acc, gasTank) => {
        const chainId = gasTank.chain_id as unknown as SupportedChainIds
        acc[chainId] = gasTank.whitelist
        return acc
    }, {} as Record<SupportedChainIds, string[]>)
    return chainToContracts
}

async function addToGasTankWhitelist(
    ownerAndWebHookAttributes: IBase,
    projectId: string,
    chain: SupportedChainIds,
    address: string
) {
    const url = `${backendUrl}/api/dashboard/project/${projectId}/gasTank/${chain}/whitelist/add`
    await axios.post(url, {
        ...ownerAndWebHookAttributes,
        address,
    })
}

async function deleteFromGasTankWhitelist(
    ownerAndWebHookAttributes: IBase,
    projectId: string,
    chain: SupportedChainIds,
    address: string
) {
    const url = `${backendUrl}/api/dashboard/project/${projectId}/gasTank/${chain}/whitelist/delete`
    await axios.post(url, {
        ...ownerAndWebHookAttributes,
        address,
    })
}

function getAddOperationsUpdateProjectContracts(
    ownerAndWebHookAttributes: IBase,
    orgProject: IProject,
    orgChainToContracts: Record<SupportedChainIds, string[]>,
    newChainToContracts: Record<SupportedChainIds, string[]>
) {
    const promises = Object.keys(newChainToContracts).map(async (chainId) => {
        const chainIdFixed = chainId as unknown as SupportedChainIds
        const newContractList = newChainToContracts[chainIdFixed]

        if (orgChainToContracts[chainIdFixed] === null) {
            await createGasTank(
                ownerAndWebHookAttributes,
                orgProject.project_id,
                chainIdFixed,
                newContractList
            )
        }
        const orgContractList = orgChainToContracts[chainIdFixed] || []

        const contractsToAdd = difference(newContractList, orgContractList)
        const addOperations = contractsToAdd.map(async (contract) => {
            await addToGasTankWhitelist(
                ownerAndWebHookAttributes,
                orgProject.project_id,
                chainIdFixed,
                contract
            )
        })
        await Promise.all(addOperations)
    })
    return promises
}

function getDeleteOperationsUpdateProjectContracts(
    ownerAndWebHookAttributes: IBase,
    orgProject: IProject,
    orgChainToContracts: Record<SupportedChainIds, string[]>,
    newChainToContracts: Record<SupportedChainIds, string[]>
) {
    const promises = Object.keys(orgChainToContracts).map(async (chainId) => {
        const chainIdFixed = chainId as unknown as SupportedChainIds
        const orgContractList = orgChainToContracts[chainIdFixed]
        const newContractList = newChainToContracts[chainIdFixed] || []

        const contractsToDelete = difference(orgContractList, newContractList)
        const addOperations = contractsToDelete.map(async (contract) => {
            await deleteFromGasTankWhitelist(
                ownerAndWebHookAttributes,
                orgProject.project_id,
                chainIdFixed,
                contract
            )
        })
        await Promise.all(addOperations)
    })
    return promises
}

export async function updateProjectContracts(
    ownerAndWebHookAttributes: IBase,
    orgProject: IProject,
    newContracts: string[],
    contractsNetworks: Array<SupportedChainIds>
) {
    const newChainToContracts = reduceContractsAndNetworksLists(
        newContracts,
        contractsNetworks
    )
    const orgChainToContracts = reduceContractsAndNetworksProject(orgProject)

    const promises = [
        getAddOperationsUpdateProjectContracts(
            ownerAndWebHookAttributes,
            orgProject,
            orgChainToContracts,
            newChainToContracts
        ),
        getDeleteOperationsUpdateProjectContracts(
            ownerAndWebHookAttributes,
            orgProject,
            orgChainToContracts,
            newChainToContracts
        ),
    ].flat()

    await Promise.all(promises)
}

export async function updateProjectNameAndDomains(
    ownerAndWebHookAttributes: IBase,
    orgProject: IProject,
    newName: string,
    newDomains: string[]
) {
    if (
        orgProject.name === newName &&
        isEqual(new Set(newDomains), new Set(orgProject.allowed_origins))
    )
        return
    if (!ownerAndWebHookAttributes) return

    await axios.post(
        `${backendUrl}/api/dashboard/project/${orgProject.project_id}`,
        {
            name: newName,
            allowedOrigins: newDomains,
            ...ownerAndWebHookAttributes,
        }
    )
}

export async function updateProject(
    ownerAndWebHookAttributes: IBase,
    orgProject: IProject,
    newName: string,
    newContracts: string[],
    contractsNetworks: Array<SupportedChainIds>,
    newDomains: string[]
) {
    const promises = [
        updateProjectNameAndDomains(
            ownerAndWebHookAttributes,
            orgProject,
            newName,
            newDomains
        ),
        updateProjectContracts(
            ownerAndWebHookAttributes,
            orgProject,
            newContracts,
            contractsNetworks
        ),
    ]

    await Promise.all(promises)
}

export async function postFetcher<T>(
    args: [string, unknown]
): Promise<T | null> {
    const [input, requestData] = args
    if (!requestData) return null
    const { data } = await axios.post(input, requestData)
    if (data.error || data.errors) {
        return null
    }

    return data
}

export async function getProjects(
    ownerAndWebHookAttributes: IBase
): Promise<IProject[]> {
    const getRawProjectsUrl = `${backendUrl}/api/dashboard/projects`
    const projects = await postFetcher<ProjectApiType[]>([
        getRawProjectsUrl,
        ownerAndWebHookAttributes,
    ])
    if (projects === null) {
        throw new Error('No projects found')
    }

    const projectWithGasTanks = await Promise.all(
        projects.map(async (project) => {
            const getGasTanksUrl = `${backendUrl}/api/dashboard/project/${project.project_id}/gasTanks`
            const gasTanks = await postFetcher<IGasTank[]>([
                getGasTanksUrl,
                ownerAndWebHookAttributes,
            ])
            if (gasTanks === null)
                throw new Error(
                    `No gas tanks found for project ${project.name}`
                )
            return { ...project, gasTanks }
        })
    )
    return projectWithGasTanks
}
