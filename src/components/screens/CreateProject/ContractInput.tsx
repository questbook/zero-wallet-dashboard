import TextField from "@/components/UI/TextField/TextField"
import { CloseIcon, WarningTwoIcon } from "@chakra-ui/icons"
import { Flex, IconButton, Text, Image, Spinner, Select, FormLabel } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import { ethers } from 'ethers';
import { CHAIN_NAMES, SupportedChainIds } from "@/constants/chains";

interface Props {
    index: number
    contracts: string[]
    setContracts: (newContracts: string[]) => void
    contractsNetworks: Array<SupportedChainIds>;
    setContractsNetworks: (newContractsNetworks: Array<SupportedChainIds>) => void;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function ContractInput(
    {
        index,
        contracts,
        setContracts,
        contractsNetworks,
        setContractsNetworks,
    }: Props
) {

    const [contractState, setContractState] = useState(0);
    const networks = [
        SupportedChainIds.POLYGON,
        SupportedChainIds.OPTIMISM,
        SupportedChainIds.CELO,
        SupportedChainIds.GOERLI,
    ];

    useEffect(() => {
        if (contractsNetworks[index]) {
            setContractState(0);
        }
        else if (contracts[index]) {
            if (!ethers.utils.isAddress(contracts[index])) {
                setContractState(1);
            }
            else {
                setContractState(0);
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
                />
            ],
        ]
    }, [networks])

    return (
        <Flex
            flexDirection={'row'}
            gap={10}
            mb={contracts.length === 0 ? 10 : 5}
            mt={index > 0 ? 8 : 0}
        >
            <Flex
                flexDirection={'row'}
                gap={10}
            >
                <Flex
                    flexDirection={'column'}
                >
                    <TextField
                        key={'contract-input-' + index}
                        label={'DAPP CONTRACT ADDRESS'}
                        placeholder={'0xCz379586E5D83500RX21126c5553cx0C77549Bxz3'}
                        value={contracts[index]}
                        fontSize={'24px'}
                        fontWeight={'700'}
                        width={'720px'}
                        onChange={
                            (e) => {
                                const newContracts = [...contracts]
                                newContracts[index] = e.target.value
                                setContracts(newContracts)
                            }
                        }
                    />

                    {contracts[index] && <Flex
                        flexDirection={'row'}
                        width={'100%'}
                        gap={'10px'}
                    >
                        {searchStateMap[contractState][1]}
                        <Text>
                            {searchStateMap[contractState][0]}
                        </Text>
                    </Flex>
                    }
                </Flex>

                <Flex
                    flexDirection={'column'}
                    gap={2}
                >
                    <Text
                        fontWeight={'700'}
                        fontSize={'14px'}
                        lineHeight={'20px'}
                        color={'#403D39'}
                    >
                        NETWORK ON WHICH CONTRACT IS DEPLOYED
                    </Text>
                    <Select
                        placeholder="Select Network"
                        onChange={(e) => {
                            e.preventDefault();
                            const newContractsNetworks = [...contractsNetworks]
                            newContractsNetworks[index] = parseInt(e.target.value)
                            setContractsNetworks(newContractsNetworks)
                        }}
                        value={contractsNetworks[index]}

                    >
                        {networks.map((network, index) => {
                            return <option
                                key={'network-input-' + index}
                                value={network}
                            >
                                {CHAIN_NAMES[network]}
                            </option>
                        })}

                    </Select>
                </Flex>


            </Flex>
            {
                contracts.length > 1 && <IconButton
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
            }
        </Flex>

    )
}