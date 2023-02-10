import { SupportedChainIds } from '@/constants/chains'
import { IBase, NewGasTank, NewProject } from '@/types'
import axios from 'axios';
import { backendUrl } from './constants';

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
    const { data: { projectId } } = await axios.post<{projectId: string}>(`${backendUrl}/api/dashboard/project`, newProject)
    return projectId
}

export async function createGasTank(
    ownerAndWebHookAttributes: IBase,
    projectId: string,
    chainId: SupportedChainIds,
    contracts: string[],
): Promise<void> {
    const newGasTank: NewGasTank = {
        chainId,
        whitelist: contracts,
        ...ownerAndWebHookAttributes
    };
    await axios.post(
        `${backendUrl}/api/dashboard/project/${projectId}/gasTank`,
        newGasTank
    );
}

export async function createGasTanks(
    ownerAndWebHookAttributes: IBase,
    projectId: string,
    contracts: string[],
    contractsNetworks: Array<SupportedChainIds>,
): Promise<void> {
    const promises = contractsNetworks.map((chainId) => createGasTank(ownerAndWebHookAttributes, projectId, chainId, contracts))
    await Promise.all(promises)
}

export async function createNewProjectWithGasTanks(
    ownerAndWebHookAttributes: IBase,
    projectName: string,
    contracts: string[],
    contractsNetworks: Array<SupportedChainIds>,
    domains: string[]
): Promise<string> {
    const newProjectId = await createNewProject(ownerAndWebHookAttributes, projectName, domains)
    await createGasTanks(ownerAndWebHookAttributes, newProjectId, contracts, contractsNetworks)
    return newProjectId
}
