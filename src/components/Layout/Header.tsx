import getAvatar from '@/utils/avatarUtils'
import { formatAddress } from '@/utils/formattingUtils'
import { Button, Flex, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'

// header component with wagmi connect button
export default function Header() {
    // const { address, isConnected } = useAccount()
    const address = '0x78d86E031605d2873f38dfa2657Fe92d8aC243f9'
    const router = useRouter()

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
                src="/zeroWallet.svg"
                alt="ZeroWallet"
                cursor="pointer"
            />
            <Flex
                justifyContent="space-between"
                alignItems="center"
                ml="auto"
                gap={5}
            >
                <Button variant="primary2">Contact us</Button>

                <Button gap={2} background="white">
                    <Image
                        borderRadius="3xl"
                        src={getAvatar(false, address ?? 'generic')}
                        boxSize="24px"
                        alt="avatar"
                    />

                    {formatAddress(address)}
                </Button>
            </Flex>
        </Flex>
    )
}
