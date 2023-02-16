import { DEFAULT_CHAIN, SupportedChainIds } from '@/constants/chains'
import { Button, Card, Flex, Image, Text, useToast, Box } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { Fragment, useState } from 'react'
import CreateProjectContractsInput from './CreateProjectContractsInput'
import CreateProjectNameInput from './CreateProjectNameInput'
import CreateProjectDomainInput from './CreateProjectDomainInput'
import FillGasTanks from './FillGasTanks'
import { isValidUrl } from '@/utils/checkers'
import useOwnerAndWebHookAttributes from '@/hooks/useOwnerAndWebHookAttributes'
import { createNewProjectWithGasTanks } from '@/api'
import { GasTankType } from '@/types'
import ProjectGasTanksCreationModal from './Modals/ProjectGasTanksCreationModal'

const mockGasTank: GasTankType = {
    gas_tank_id: '0x123',
    project_id: '1242-fdsdv-123',
    created_at: '2021-09-01T00:00:00.000Z',
    chain_id: '5',
    provider_url: '',
    funding_key: '1772',
    whitelist: ['0x123', '0x456'],
    balance: '0',
}

export default function CreateProject() {
    const ownerAndWebHookAttributes = useOwnerAndWebHookAttributes();

    // current step
    const [step, setStep] = useState(2)

    // step 1: name
    const [projectName, setProjectName] = useState<string>('')
    const [projectNameError, setProjectNameError] = useState<string>('')

    // step 2: contract whitelist
    const [contracts, setContracts] = useState<Array<string>>([''])
    const [contractsNetworks, setContractsNetworks] = useState<
        Array<SupportedChainIds>
    >([DEFAULT_CHAIN])
    const [contractsError, setContractsError] = useState<string>('')

    // step 3: allowed domains
    const [domains, setDomains] = useState<Array<string>>([''])
    const [domainsError, setDomainsError] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState(true)

    // step 4: fill gas tanks
    const [gasTanks, setGasTanks] = useState<GasTankType[]>([mockGasTank, mockGasTank])

    // ui
    const toast = useToast()

    const nextClick = () => {
        if (step === 0) {
            if (projectName === '') {
                setProjectNameError('Project name is required')
            } else {
                setProjectNameError('')
                setStep(1)
            }
            return
        } else if (step === 1) {
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
            } else {
                setContractsError('')
                setStep(2)
            }
            return
        } else if (step === 2) {
            const error = domains.some((domain) => !isValidUrl(domain))
            if (error) {
                setDomainsError(
                    'Invalid domains / At least one valid domain is required.'
                )
            } else {
                setDomainsError('')
                if (!ownerAndWebHookAttributes) {
                    toast({
                        title: 'Error',
                        description: 'Please connect your wallet.',
                        status: 'error',
                        isClosable: true,
                    })
                }
                else {
                    setIsModalOpen(true)
                    createNewProjectWithGasTanks(ownerAndWebHookAttributes, projectName, contracts, contractsNetworks, domains)
                        .then((res) => {
                            setGasTanks(res.gasTanks)
                            setIsModalOpen(false)
                            setStep(3)
                        })
                }
            }
        }
        else if (step === 3){
            
        }
    }

    const prevClick = () => {
        if (step === 1) {
            setStep(0)
            return
        }

        if (step === 2) {
            setStep(1)
            return
        }
    }

    const steps = [
        <CreateProjectNameInput
            errorText={projectNameError}
            setName={(newValue) => setProjectName(newValue)}
            name={projectName}
            key={'child-1'}
        />,
        <CreateProjectContractsInput
            setContracts={(newValue) => setContracts(newValue)}
            contracts={contracts}
            contractsNetworks={contractsNetworks}
            setContractsNetworks={(newValue) => setContractsNetworks(newValue)}
            contractsError={contractsError}
            key={'child-2'}
        />,
        <CreateProjectDomainInput
            key={'child-3'}
            domains={domains}
            setDomains={(newValue) => setDomains(newValue)}
            domainsError={domainsError}
        />,
        <FillGasTanks
            key={'child-4'}
            gasTanks={gasTanks}
        />,
    ]

    return (
        <Fragment>
            <ProjectGasTanksCreationModal isOpen={isModalOpen} />

            <Card
                width="100%"
                paddingBlock={54}
                alignItems="flex-start"
                flexDirection={'column'}
                display="flex"
            >
                <Flex flexDirection={'column'} w="100%" px="5">
                    {
                        step <= 2 && <Text
                            fontSize={'64px'}
                            fontWeight={'700'}
                            lineHeight={'72px'}
                            marginBottom={'40px'}
                        >
                            Connect your Dapp
                        </Text>
                    }

                    {steps[step]}
                    <Flex
                        flexDirection={'row'}
                        maxWidth={'100%'}
                        width={'100%'}
                        mt={10}
                    >
                        {step > 0 && step < 3 && (
                            <Button
                                backgroundColor={'#E0DCD5'}
                                borderRadius={'27px'}
                                py='10px'
                                pr='32px'
                                pl='15px'
                                color='black.2'
                                onClick={prevClick}
                                display='flex'
                                alignItems={'center'}
                                justifyContent='center'
                                gap={3}
                            >
                                <Image
                                    src='/assets/ArrowLeft.svg'
                                    alt=''
                                    h='80%'
                                />
                                <Box>
                                    <Text
                                        variant={'heading3Bold'}
                                        color={'inherit'}
                                    >
                                        Back
                                    </Text>
                                </Box>


                            </Button>
                        )}
                        <Button
                            backgroundColor={'#EC5D2A'}
                            borderRadius={'27px'}
                            onClick={nextClick}
                            color='white'
                            // p='10 32'
                            py='10px'
                            px='32px'
                            ml={'auto'}
                        >
                            <Text
                                variant={'heading3Bold'}
                                color={'inherit'}
                            >
                                {
                                    step === 3 ? "Add zero to your Dapp" : "Continue"
                                }
                            </Text>

                        </Button>
                    </Flex>
                </Flex>
            </Card>
        </Fragment>
    )
}
