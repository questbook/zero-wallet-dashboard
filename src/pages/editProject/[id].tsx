
import { updateProject } from "@/api";
import EditProjectCard from "@/components/screens/EditProject/EditProjectCard";
import { SupportedChainIds } from "@/constants/chains";
import useOwnerAndWebHookAttributes from "@/hooks/useOwnerAndWebHookAttributes";
import { GasTankType, IProject } from "@/types";
import { isValidUrl } from "@/utils/checkers";
import { Flex, Button, Box, Text, useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useRouter } from "next/router"
import { useState } from "react";

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

const project: IProject = {
    project_id: '123213-adf',
    project_api_key: 'a9877814-452b-48f1-8c4f-7c8468a87e05',
    name: 'Questbook',
    created_at: '2021-09-01T00:00:00.000Z',
    owner_scw: '0x00',
    allowed_origins: ['www.bla.com'],
    gasTanks: [mockGasTank1, mockGasTank2],
}

export default function EditProject() {

    const router = useRouter()
    const projectId = router.query;

    const addressesAndChain = project.gasTanks.map(gastank => {
        return gastank.whitelist.map(address => ({ address, chainId: gastank.chain_id }))
    }).flat();
    const orgContracts = addressesAndChain.map(elem => elem.address)
    const orgNetworks = addressesAndChain.map(elem => elem.chainId as unknown as SupportedChainIds)

    const ownerAndWebHookAttributes = useOwnerAndWebHookAttributes();

    const [nameUpdated, setNameUpdated] = useState(project.name)
    const [projectNameError, setProjectNameError] = useState<string>('')


    const [contracts, setContracts] = useState<Array<string>>(orgContracts)
    const [contractsNetworks, setContractsNetworks] = useState<
        Array<SupportedChainIds>
    >(orgNetworks)
    const [contractsError, setContractsError] = useState<string>('')

    const [domains, setDomains] = useState([...project.allowed_origins])
    const [domainsError, setDomainsError] = useState<string>('')

    const toast = useToast()

    const isValidName = () => {
        if (nameUpdated === '') {
            setProjectNameError('Project name is required')
            return false
        } else {
            setProjectNameError('')
            return true
        }
    }

    const isValidContracts = () => {
        let error = false
        contracts.forEach((contract: string) => {
            if (!ethers.utils.isAddress(contract)) {
                setContractsError(
                    'Invalid contracts / At least one valid contract is required.'
                )
                error = true
            }
        })

        if (contractsNetworks.length === 0 || error) {
            setContractsError(
                'Invalid contracts / At least one valid contract is required.'
            )
            error = false
            return false
        } else {
            setContractsError('')
            return true;
        }
    }

    const isValidDomains = () => {
        const error = domains.some((domain) => !isValidUrl(domain))
        if (error) {
            setDomainsError(
                'Invalid domains / At least one valid domain is required.'
            )
        } else {
            setDomainsError('')
            return true;
        }
    }

    const handleSave = () => {
        const isValid = isValidName() && isValidContracts() && isValidDomains()
        if (!isValid) return;

        if (!ownerAndWebHookAttributes) {
            toast({
                title: 'Error',
                description: 'Please connect your wallet.',
                status: 'error',
                isClosable: true,
            })
            return
        }

        updateProject(
            ownerAndWebHookAttributes,
            project,
            nameUpdated,
            contracts,
            contractsNetworks,
            domains
        ).then(() => {
            toast({
                title: 'Success',
                description: 'Your changes are saved now.',
                status: 'success',
                isClosable: true,
            })
        })
    }

    return (
        <Box
            p='5'
        >
            <Flex
                mb='50'
                alignItems={'center'}
                justifyContent='center'
            >
                <Text
                    variant='heading1Bold'
                    lineHeight='100%'
                >
                    Edit Dapp
                </Text>
                <Button
                    variant='primary2'
                    ml='auto'
                    onClick={() => {
                        router.push('/createProject')
                    }}
                >
                    <Text
                        variant={'heading3Bold'}
                        color={'inherit'}
                        onClick={handleSave}
                    >
                        Save
                    </Text>
                </Button>
            </Flex>
            <EditProjectCard
                nameUpdated={nameUpdated}
                setNameUpdated={(newVal) => setNameUpdated(newVal)}
                nameUpdatedError={projectNameError}

                contracts={contracts}
                setContracts={(newVal) => setContracts(newVal)}
                contractsNetworks={contractsNetworks}
                setContractsNetworks={(newVal) => setContractsNetworks(newVal)}
                contractsError={contractsError}

                domains={domains}
                setDomains={(newValue) => setDomains(newValue)}
                domainsError={domainsError} />
        </Box>
    )
}
