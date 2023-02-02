import { SupportedChainIds } from '@/constants/chains'
import { Button, Flex, Text } from '@chakra-ui/react'
import ContractInput from './ContractInput'

interface Props {
    setContracts: (newContracts: Array<string>) => void
    contracts: Array<string>
    contractsNetworks: Array<SupportedChainIds>
    setContractsNetworks: (
        newContractsNetworks: Array<SupportedChainIds>
    ) => void
    contractsError: string
}

export default function CreateProjectContractsInput({
    setContracts,
    contracts,
    contractsNetworks,
    setContractsNetworks,
    contractsError,
}: Props) {
    return (
        <Flex flexDirection={'column'}>
            {contracts.length > 0 &&
                contracts.map((_: string, index: number) => {
                    return (
                        <>
                            <ContractInput
                                key={'contract-' + index}
                                index={index}
                                contracts={contracts}
                                setContracts={setContracts}
                                contractsNetworks={contractsNetworks}
                                setContractsNetworks={setContractsNetworks}
                            />

                            {index !== contracts.length - 1 && (
                                <div
                                    key={'line-' + index}
                                    style={{
                                        borderBottomColor: 'black',
                                        borderBottomWidth: 1,
                                        width: '720px',
                                    }}
                                />
                            )}
                        </>
                    )
                })}

            <Text mb={10}>{contractsError}</Text>

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
                width="316px"
                height="52px"
                onClick={() => {
                    setContracts([...contracts, ''])
                }}
            >
                Add another contract
            </Button>
        </Flex>
    )
}
