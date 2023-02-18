import TextField from '@/components/UI/TextField/TextField'
import { CHAIN_ICONS, CHAIN_NAMES, SupportedChainIds } from '@/constants/chains'
import { abi, ADDRESS_BY_CHAIN_ID } from '@/contracts/gasTank'
import { GasTankType } from '@/types'
import { Box, Button, Flex, Image, Text, useToast } from '@chakra-ui/react'
import { Contract, providers, utils } from 'ethers'
import { useState } from 'react'
import { formatAddress } from '@/utils/formattingUtils'


interface Props {
    gasTank: GasTankType
}

export default function GasTankFiller({ gasTank }: Props) {
    const [gasValue, setGasValue] = useState('0')
    const toast = useToast()

    const chainId = gasTank.chain_id as unknown as SupportedChainIds
    const contractAddress = ADDRESS_BY_CHAIN_ID[chainId]

    const handleFill = async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!window.ethereum) {
            toast({
                title: 'Error',
                description: `Please install MetaMask`,
                status: 'error',
                isClosable: true,
            })
            return
        }

        // const provider = window.ethereum

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' })
        }
        catch {
            toast({
                title: 'Error',
                description: `Please connect to MetaMask`,
                status: 'error',
                isClosable: true,
            })
            return
        }
        const chainIdNumber = parseInt(gasTank.chain_id)
        const hexChainId = `0x${chainIdNumber.toString(16)}`
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: hexChainId }],
            });
        }
        catch {
            toast({
                title: 'Error',
                description: `Please switch the network to ${CHAIN_NAMES[chainId]}.`,
                status: 'error',
                isClosable: true,
            })
            return
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const signer = (new providers.Web3Provider(window.ethereum, chainIdNumber)).getSigner()
        const contract = new Contract(contractAddress, abi, signer)
        const address = await signer.getAddress()
        const tx = await contract.depositFor(parseInt(gasTank.funding_key), {
            from: address,
            value: utils.parseUnits(gasValue),
        })
        const receipt = await tx.wait(1)
        console.log('receipt', receipt)
    }

    return (
        <Flex
            direction={{ base: 'column', lg: 'row' }}
            // alignItems={{ base: 'flex-start', lg: 'center' }}
            alignItems={'center'}
            gap={{ base: '5', lg: '0' }}
        >
            <Image
                display={{ base: 'none', lg: 'inherit' }}
                mr="auto"
                src="/assets/Gas.svg"
                alt="Gas Tank"
                cursor="pointer"
                m="5"
                ml="0"
            />
            
            <Box m="5">
                <Text variant="heading3Regular" color="black.1" mr="auto">
                    {formatAddress(contractAddress)}
                </Text>
                <Flex>
                    <Image
                        src={CHAIN_ICONS[chainId]}
                        alt={`${CHAIN_NAMES[chainId]} icon`}
                        m="1"
                    />
                    <Text
                        m="1"
                        variant={'Body1Bold'}
                        textTransform="uppercase"
                        color={'black.2'}
                    >
                        {CHAIN_NAMES[chainId]}
                    </Text>
                </Flex>
            </Box>

            <TextField
                label={'ADD GAS TO YOUR CONTRACT TANK'}
                placeholder="Amount"
                type="number"
                value={gasValue}
                onChange={(e) => {
                    const value = e.target.value
                    setGasValue(value)
                }}
                ml="20"
                mr={5}
            />

            <Button variant={'secondary2'} mx="5" mt="4" onClick={handleFill}>
                <Text variant={'heading3Bold'}>Add</Text>
            </Button>

            <Box
                backgroundColor={'gray.2'}
                borderRadius={'16px'}
                mx="20"
                padding="24px 32px"
                textAlign={'center'}
            >
                <Text variant={'Body1Bold'}>AVAILABLE GAS</Text>
                <Text variant={'heading3Regular'}>{gasTank.balance}</Text>
            </Box>
        </Flex>
    )
}
