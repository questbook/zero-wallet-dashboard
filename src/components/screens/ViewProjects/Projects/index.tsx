import { IProject, GasTankType } from "@/types";
import { Fragment } from "react";
import SingleProject from "./SingleProject";

const mockGasTank1: GasTankType = {
    gas_tank_id: '0x123',
    project_id: '1242-fdsdv-123',
    created_at: '2021-09-01T00:00:00.000Z',
    chain_id: '5',
    provider_url: '',
    funding_key: '1772',
    whitelist: ['0x123', '0x456'],
    balance: '5',
}

const mockGasTank2: GasTankType = {
    gas_tank_id: '0x124',
    project_id: '1242-fdsdv-123',
    created_at: '2021-09-01T00:00:00.000Z',
    chain_id: '10',
    provider_url: '',
    funding_key: '1773',
    whitelist: ['0x123', '0x456'],
    balance: '0',
}

const projects: IProject[] = [
    {
        project_id: '123213-adf',
        project_api_key: 'a9877814-452b-48f1-8c4f-7c8468a87e05',
        name: 'Questbook',
        created_at: '2021-09-01T00:00:00.000Z',
        owner_scw: '0x00',
        allowed_origins: ['www.bla.com'],
        gasTanks: [mockGasTank1, mockGasTank2],
    },

    {
        project_id: '123213-adf',
        project_api_key: 'string',
        name: 'Opensea',
        created_at: '2021-09-01T00:00:00.000Z',
        owner_scw: '0x00',
        allowed_origins: ['www.bla.com'],
        gasTanks: [mockGasTank1, mockGasTank2],
    },

]

export default function Projects() {
    return (
        <Fragment >
            {
                projects.map(project => (
                    <SingleProject key={project.project_id} project={project} />
                ))
            }
        </Fragment>

    )
}
