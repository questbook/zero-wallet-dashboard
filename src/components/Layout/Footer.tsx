import { Flex, Image, Spacer, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

export default function Footer() {
    const router = useRouter()

    return (
        <Flex p={9}>
            <Flex as="footer" gap={5}>
                <Link as={NextLink} href="#">
                    About us
                </Link>
                <Link as={NextLink} href="#">
                    Explore Grants
                </Link>
                <Link as={NextLink} href="#">
                    Terms of Service
                </Link>
            </Flex>

            <Spacer />

            <Image
                onClick={() => {
                    router.push({
                        pathname: '/',
                    })
                }}
                display={{ base: 'none', lg: 'inherit' }}
                mr="auto"
                src="/ui_icons/qb.svg"
                alt="Questbook"
                cursor="pointer"
            />
        </Flex>
    )
}
