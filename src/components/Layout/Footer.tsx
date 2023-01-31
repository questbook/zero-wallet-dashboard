import { Flex, Image, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Footer() {

    const router = useRouter()

    return (
        <Flex p={9}>
            <Flex as="footer" gap={3}>
                <Link
                    href='#'
                    
                >
                    About us
                </Link>
                <Link
                    href='#'
                >
                    Explore Grants
                </Link>
                <Link
                    href='#'
                >
                    Terms of Service
                </Link>

            </Flex>
            
            <Spacer />

            <Image
                onClick={
                    () => {
                        router.push({
                            pathname: '/'
                        })
                    }
                }
                display={{ base: 'none', lg: 'inherit' }}
                mr='auto'
                src='/ui_icons/qb.svg'
                alt='Questbook'
                cursor='pointer'
            />
        </Flex>
    )
}
