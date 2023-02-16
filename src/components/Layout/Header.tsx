import getAvatar from '@/utils/avatarUtils'
import { formatAddress, formatAddressLong } from '@/utils/formattingUtils'
import { useClipboard, Button, Flex, Image, Text, PopoverTrigger, PopoverArrow, PopoverBody, PopoverContent, Popover } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { useAccount } from 'wagmi'

// header component with wagmi connect button
export default function Header() {
    const { address } = useAccount()
    const zeroAddress = '0x000000000000000'
    const router = useRouter()
    const popoverRef = useRef<HTMLButtonElement>(null)
    const { onCopy } = useClipboard(address || '')

    return (
        <Flex as="header" p={4}>
            <Image
                onClick={() => {
                    router.push({
                        pathname: '/',
                    })
                }}
                display={{ base: 'none', lg: 'inherit' }}
                mr="auto"
                src="/ui_icons/zeroWallet.svg"
                alt="ZeroWallet"
                cursor="pointer"
            />
            <Flex
                justifyContent="space-between"
                alignItems="center"
                ml="auto"
                gap={5}
            >
                <a
                    href="https://t.me/madhavanmalolan"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Button
                        variant={
                            router.pathname === '/' ? 'primary2' : 'secondary2'
                        }
                    >
                        <Text variant="heading3Bold" color={'inherit'}>
                            Contact us
                        </Text>
                    </Button>
                </a>

                <Popover
                    placement='bottom-end'
                    isLazy
                    initialFocusRef={popoverRef}>
                    <PopoverTrigger>
                        <Button gap={2} background="white">
                            <Image
                                borderRadius="3xl"
                                src={getAvatar(false, address ?? 'generic')}
                                boxSize="24px"
                                alt="avatar"
                            />

                            {address ? formatAddress(address) : formatAddress(zeroAddress)}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverBody>
                            <Flex
                                direction='column'
                                align='stretch'
                                bg='white'
                                gap={3}
                            >
                                <Text
                                    variant={'Body1Bold'}
                                    color='black.2'
                                >
                                    Your zero wallet
                                </Text>
                                <Text
                                    variant='title1Regular'
                                    color={'black.2'}
                                    mb='3'
                                >
                                    {formatAddressLong(address || zeroAddress)}
                                </Text>

                                <Flex>
                                    <Image
                                        src='/assets/Keys.svg'
                                        alt='key'
                                    />
                                    <Text
                                        ml={2}
                                        _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
                                        onClick={
                                            () => {
                                                onCopy()
                                            }
                                        }
                                        variant='title1Regular'
                                        color={'black.2'}
                                    >
                                        Save wallet key
                                    </Text>
                                </Flex>
                            </Flex>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Flex>
        </Flex>
    )
}
