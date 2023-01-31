import { Flex, Heading, Text } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

// header component with wagmi connect button
export default function Header() {
    const { address, isConnected } = useAccount()

    return (
        <header>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                w="100%"
                h="100%"
                p="1rem"
                m="1rem"
            >
                <Flex>
                    <Heading as="h1" size="lg" color="Highlight" mr="1rem">
                        Zero Wallet Dashboard
                    </Heading>
                </Flex>
                <Flex
                    gap={5}
                    alignItems="center"
                    justifyContent={isConnected ? 'flex-end' : 'center'}
                >
                    <Text pr="5rem" color="Highlight">
                        {isConnected ? address : 'Disconnected'}
                    </Text>
                </Flex>
            </Flex>
        </header>
    )
}
