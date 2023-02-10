import { DEFAULT_CHAIN, SupportedChainIds } from '@/constants/chains'
import { Button, Card, Flex, Text, useToast } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useState } from 'react'
import CreateProjectContractsInput from './CreateProjectContractsInput'
import CreateProjectNameInput from './CreateProjectNameInput'
import CreateProjectDomainInput from './CreateProjectDomainInput'
import { isValidUrl } from '@/utils/checkers'
import useOwnerAndWebHookAttributes from '@/hooks/useOwnerAndWebHookAttributes'
import { createNewProjectWithGasTanks } from '@/api'

export default function CreateProject() {
    const ownerAndWebHookAttributes = useOwnerAndWebHookAttributes();

    // current step
    const [step, setStep] = useState(0)

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
                    createNewProjectWithGasTanks(ownerAndWebHookAttributes, projectName, contracts, contractsNetworks, domains);
                }
            }
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
            setName={setProjectName}
            name={projectName}
            key={'child-1'}
        />,
        <CreateProjectContractsInput
            setContracts={setContracts}
            contracts={contracts}
            contractsNetworks={contractsNetworks}
            setContractsNetworks={setContractsNetworks}
            contractsError={contractsError}
            key={'child-2'}
        />,
        <CreateProjectDomainInput
            key={'child-3'}
            domains={domains}
            setDomains={setDomains}
            domainsError={domainsError}
        />,
    ]

    return (
        <Card
            width="100%"
            paddingBlock={54}
            alignItems="flex-start"
            flexDirection={'column'}
            display="flex"
        >
            <Flex flexDirection={'column'} w="100%" px="5">
                <Text
                    fontSize={'64px'}
                    fontWeight={'700'}
                    lineHeight={'72px'}
                    marginBottom={'40px'}
                >
                    {step <= 2 ? 'Connect your Dapp' : 'Connect'}
                </Text>
                {steps[step]}
                <Flex
                    flexDirection={'row'}
                    maxWidth={'100%'}
                    width={'100%'}
                    mt={10}
                >
                    {step > 0 && (
                        <Button
                            backgroundColor={'#E0DCD5'}
                            borderRadius={'27px'}
                            alignItems="flex-end"
                            fontStyle={'normal'}
                            fontWeight={'700'}
                            fontSize={'24px'}
                            color="#403D39"
                            lineHeight={'32px'}
                            padding="10px 20px"
                            width="134px"
                            height="52px"
                            onClick={prevClick}
                        >
                            Back
                        </Button>
                    )}
                    <Button
                        backgroundColor={'#EC5D2A'}
                        borderRadius={'27px'}
                        fontStyle={'normal'}
                        fontWeight={'700'}
                        fontSize={'24px'}
                        color="white"
                        alignSelf="flex-end"
                        lineHeight={'32px'}
                        width="172px"
                        height="52px"
                        onClick={nextClick}
                        ml={'auto'}
                    >
                        Continue
                    </Button>
                </Flex>
            </Flex>
        </Card>
    )
}
