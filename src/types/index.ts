import { DeployWebHookAttributesType } from 'zero-wallet-wagmi-connector'

export interface GasTankType {
    gas_tank_id: string
    project_id: string
    created_at: string
    chain_id: string
    provider_url: string
    funding_key: string
    whitelist: string[]
    balance: string
}

export interface NewGasTank extends IBase {
    chainId: number
    whitelist: string[]
}

export interface ProjectApiType {
    project_id: string
    project_api_key: string
    name: string
    created_at: string
    owner_scw: string
    allowed_origins: string[]
}

export interface IBase {
    ownerScw: string
    webHookAttributes: DeployWebHookAttributesType
}

export interface NewProject extends IBase {
    name: string
    allowedOrigins: string[]
}

export type IProject = ProjectApiType & {
    gasTanks: IGasTank[]
}

export type IGasTank = GasTankType

export interface CreateProjectEntity {
    createNew: 'project'
}

export interface CreateGasTankEntity {
    createNew: 'gasTank'
    projectId: string
}

export type EntityType =
    | IProject
    | IGasTank
    | CreateProjectEntity
    | CreateGasTankEntity
