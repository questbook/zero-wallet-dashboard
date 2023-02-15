import { SupportedChainIds } from '@/constants/chains'
import { GasTankType, IBase, NewGasTank, NewProject } from '@/types'
import axios from 'axios'
import { backendUrl } from './constants'

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
        const chainIdFixed = chainId as unknown as SupportedChainIds;  
        console.log(chainIdFixed)
        return createGasTank(ownerAndWebHookAttributes, projectId, chainIdFixed, chainToContracts[chainIdFixed])
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
