import TextField from '@/components/UI/TextField/TextField'
import { CHAIN_ICONS, CHAIN_NAMES, SupportedChainIds } from '@/constants/chains'
import { abi, ADDRESS_BY_CHAIN_ID } from '@/contracts/gasTank'
import { GasTankType } from '@/types'
import { formatAddress, formatGasPrice } from '@/utils/formattingUtils'
import {
    Box,
    Button,
    ButtonGroup,
    Collapse,
    Flex,
    Image,
    Text,
    useDisclosure,
    useToast,
} from '@chakra-ui/react'
import { Contract, utils, providers } from 'ethers'
import { Fragment, useState } from 'react'

interface Props {
    gasTank: GasTankType
}

export default function GasTankFiller({ gasTank }: Props) {
    const toast = useToast()
    const [gasValue, setGasValue] = useState('0')
    const { isOpen, onToggle } = useDisclosure()

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
        } catch {
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
            })
        } catch {
            toast({
                title: 'Error',
                description: `Please switch the network to ${CHAIN_NAMES[chainId]}.`,
                status: 'error',
                isClosable: true,
            })
            return
        }

        let signer
        try {
            signer = new providers.Web3Provider(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                window.ethereum,
                chainIdNumber
            ).getSigner()
        } catch {
            toast({
                title: 'Error',
                description: `Metamask is not connected`,
                status: 'error',
                isClosable: true,
            })
            return
        }

        try {
            const contract = new Contract(contractAddress, abi, signer)
            const tx = await contract.depositFor(
                parseInt(gasTank.funding_key),
                {
                    value: utils.parseUnits(gasValue),
                    gasLimit: 91000,
                }
            )
            await tx.wait(1)
        } catch {
            toast({
                title: 'Error',
                description: `Transaction rejected`,
                status: 'error',
                isClosable: true,
            })
            return
        }
    }

    return (
        <Fragment>
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

                <Box
                    backgroundColor={'gray.2'}
                    borderRadius={'16px'}
                    mx="10rem"
                    padding="24px 32px"
                    textAlign={'center'}
                >
                    <Text variant={'Body1Bold'}>AVAILABLE GAS</Text>
                    <Text variant={'heading3Regular'}>
                        {formatGasPrice(parseFloat(gasTank.balance))}
                    </Text>
                </Box>

                {!isOpen && (
                    <Button
                        variant={'primary2'}
                        mx="5"
                        mt="4"
                        onClick={onToggle}
                    >
                        <Text variant={'heading3Bold'} color="inherit">
                            Add
                        </Text>
                    </Button>
                )}
            </Flex>

            <Collapse in={isOpen} style={{ zIndex: 10 }}>
                <Flex
                    // justifyContent={'center'}
                    alignItems="center"
                    mt="5"
                >
                    <TextField
                        label={'ADD GAS TO YOUR CONTRACT TANK'}
                        placeholder="Amount"
                        type="number"
                        value={gasValue}
                        onChange={(e) => {
                            const value = e.target.value
                            setGasValue(value)
                        }}
                        mr={5}
                    />
                    <ButtonGroup>
                        <Button
                            variant={'primary2'}
                            mx="5"
                            mt="4"
                            onClick={handleFill}
                        >
                            <Text variant={'heading3Bold'} color="inherit">
                                Add
                            </Text>
                        </Button>
                        <Button
                            variant={'secondary2'}
                            mx="5"
                            mt="4"
                            onClick={onToggle}
                        >
                            <Text variant={'heading3Bold'} color="inherit">
                                Cancel
                            </Text>
                        </Button>
                    </ButtonGroup>
                </Flex>
            </Collapse>
        </Fragment>
    )
}
