import TextField from '@/components/UI/TextField/TextField'
import { CloseIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Text, Image } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { ethers } from 'ethers'
import { CHAIN_ICONS, CHAIN_NAMES, SupportedChainIds } from '@/constants/chains'
import Dropdown from '@/components/UI/Dropdown.tsx'

interface Props {
    index: number
    contracts: string[]
    setContracts: (newContracts: string[]) => void
    contractsNetworks: Array<SupportedChainIds>
    setContractsNetworks: (
        newContractsNetworks: Array<SupportedChainIds>
    ) => void
}

export default function ContractInput({
    index,
    contracts,
    setContracts,
    contractsNetworks,
    setContractsNetworks,
}: Props) {
    const [contractState, setContractState] = useState(0)
    const networks = Object.keys(SupportedChainIds).filter((v) =>
        isNaN(Number(v))) as (keyof typeof SupportedChainIds)[]

    useEffect(() => {
        if (contractsNetworks[index]) {
            setContractState(0)
        } else if (contracts[index]) {
            if (!ethers.utils.isAddress(contracts[index])) {
                setContractState(1)
            } else {
                setContractState(0)
            }
        }
    }, [index, contracts, contractState, contractsNetworks])

    const searchStateMap = useMemo(() => {
        return [
            ['', <></>],
            [
                'This is not a valid contract address.',
                <Image
                    display={{ lg: 'inherit' }}
                    src="/assets/Warning.svg"
                    alt="ZeroWallet"
                    cursor="pointer"
                    key={2}
                />,
            ],
        ]
    }, [])

    return (
        <Flex
            flexDirection={'row'}
            gap={10}
            mb={contracts.length === 0 ? 10 : 5}
            mt={index > 0 ? 8 : 0}
        >
            <Flex flexDirection={'row'} gap={10}>
                <Flex flexDirection={'column'}>
                    <TextField
                        key={'contract-input-' + index}
                        label={'DAPP CONTRACT ADDRESS'}
                        placeholder={
                            '0xCz379586E5D83500RX21126c5553cx0C77549Bxz3'
                        }
                        value={contracts[index]}
                        fontSize={'24px'}
                        fontWeight={'700'}
                        width={'720px'}
                        onChange={(e) => {
                            const newContracts = [...contracts]
                            newContracts[index] = e.target.value
                            setContracts(newContracts)
                        }}
                    />

                    {contracts[index] && (
                        <Flex flexDirection={'row'} width={'100%'} gap={'10px'}>
                            {searchStateMap[contractState][1]}
                            <Text>{searchStateMap[contractState][0]}</Text>
                        </Flex>
                    )}
                </Flex>

                <Flex flexDirection={'column'} gap={2}>
                    <Text
                        fontWeight={'700'}
                        fontSize={'14px'}
                        lineHeight={'20px'}
                        color={'#403D39'}
                    >
                        NETWORK ON WHICH CONTRACT IS DEPLOYED
                    </Text>
                    <Dropdown
                        handleChange={(newElem) => {
                            const newContractsNetworks = [...contractsNetworks]
                            newContractsNetworks[index] = newElem.value
                            setContractsNetworks(newContractsNetworks)
                        }}
                        selectedItem={{
                            label: CHAIN_NAMES[contractsNetworks[index]],
                            value: contractsNetworks[index],
                            iconPath: CHAIN_ICONS[contractsNetworks[index]]
                        }}
                        listItems={networks.map(network => {
                            const keyNetwork = SupportedChainIds[network];
                            return {
                                value: keyNetwork,
                                label: CHAIN_NAMES[keyNetwork],
                                iconPath: CHAIN_ICONS[keyNetwork]
                            }


                        })}
                    />
                    {/* {networks.map((network, index) => {
                            return (
                                <option
                                    key={'network-input-' + index}
                                    value={network}
                                >
                                    {CHAIN_NAMES[network]}
                                </option>
                            )
                        })} */}
                    {/* </Dropdown> */}
                </Flex>
            </Flex>
            {contracts.length > 1 && (
                <IconButton
                    borderColor={'#E0DCD5'}
                    backgroundColor={'#FFFFFF'}
                    icon={<CloseIcon />}
                    aria-label={''}
                    mt={6}
                    border={'1px solid #E0DCD5'}
                    borderRadius={'8px'}
                    onClick={() => {
                        const newContracts = [...contracts]
                        newContracts.splice(index, 1)
                        setContracts(newContracts)
                        const newContractsNetworks = [...contractsNetworks]
                        newContractsNetworks.splice(index, 1)
                        setContractsNetworks(newContractsNetworks)
                    }}
                />
            )}
        </Flex>
    )
}
