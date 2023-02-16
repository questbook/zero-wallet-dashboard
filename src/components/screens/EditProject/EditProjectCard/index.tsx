import TextField from '@/components/UI/TextField/TextField'
import { DEFAULT_CHAIN, SupportedChainIds } from '@/constants/chains'
import { Card, Text, Box, Button, Divider } from '@chakra-ui/react'
import { Fragment } from 'react'
import ContractModifier from './ContractModifier'
import DomainModifier from './DomainModifier'

interface Props {
    nameUpdated: string
    setNameUpdated: (newValue: string) => void
    nameUpdatedError: string

    setContracts: (newContracts: Array<string>) => void
    contracts: Array<string>
    contractsNetworks: Array<SupportedChainIds>
    setContractsNetworks: (
        newContractsNetworks: Array<SupportedChainIds>
    ) => void
    contractsError: string

    setDomains: (newDomains: Array<string>) => void
    domains: Array<string>
    domainsError: string
}

export default function EditProjectCard({
    nameUpdated,
    setNameUpdated,
    nameUpdatedError,

    contracts,
    setContracts,
    contractsNetworks,
    setContractsNetworks,
    contractsError,

    setDomains,
    domains,
    domainsError,
}: Props) {
    return (
        <Card borderRadius="24px" backgroundColor="white" p="10" my="50">
            <TextField
                label={'Dapp Name'}
                placeholder={'Axie Infinity'}
                value={nameUpdated}
                fontSize={'24px'}
                fontWeight={'700'}
                width={'720px'}
                errorText={nameUpdatedError}
                onChange={(e) => setNameUpdated(e.target.value)}
            />

            <br />
            <br />

            <Box mb="10">
                <Text variant={'Body1Bold'} color="black.2">
                    DAPP CONTRACT ADDRESS
                </Text>

                {contracts.length > 0 &&
                    contracts.map((_: string, index: number) => {
                        return (
                            <Fragment key={'contract-fragment-' + index}>
                                <ContractModifier
                                    index={index}
                                    contracts={contracts}
                                    setContracts={setContracts}
                                    contractsNetworks={contractsNetworks}
                                    setContractsNetworks={setContractsNetworks}
                                />

                                {index !== contracts.length - 1 && (
                                    <Divider m={5} w="100%" />
                                )}
                            </Fragment>
                        )
                    })}

                <Text mb={10}>{contractsError}</Text>
                <Button
                    variant={'secondary2'}
                    onClick={() => {
                        setContracts([...contracts, ''])
                        setContractsNetworks([
                            ...contractsNetworks,
                            DEFAULT_CHAIN,
                        ])
                    }}
                >
                    <Text variant={'heading3Bold'} color="inherit">
                        Add another contract
                    </Text>
                </Button>
            </Box>

            <Box>
                <Text variant={'Body1Bold'} color="black.2">
                    DOMAINS FOR YOUR DAPP
                </Text>

                {domains.length > 0 &&
                    domains.map((_: string, index: number) => {
                        return (
                            <Fragment key={'domain-index'}>
                                <DomainModifier
                                    key={'domain-' + index}
                                    index={index}
                                    domains={domains}
                                    setDomains={setDomains}
                                />

                                {index !== domains.length - 1 && (
                                    <Divider m={5} w="100%" />
                                )}
                            </Fragment>
                        )
                    })}

                <Text mb={10}>{domainsError}</Text>
                <Button
                    variant={'secondary2'}
                    onClick={() => {
                        setDomains([...domains, ''])
                    }}
                >
                    <Text variant={'heading3Bold'} color="inherit">
                        Add another domain
                    </Text>
                </Button>
            </Box>
        </Card>
    )
}
