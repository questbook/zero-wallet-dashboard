import Head from 'next/head'
import { Text, Box, Card, Flex, Spacer, Button, Image } from '@chakra-ui/react'
import TextFade from '@/components/UI/animations/TextFade'
import { useRouter } from 'next/router'

export default function Home() {

    const router = useRouter()

    const handleClick = () => {
        router.push('/createProject')
    }

    return (
        <>
            <Head>
                <title>Zero Wallet Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box
                // direction={'column'}
                // align={'center'}
                // justify={'center'}
                my="10"
                mx="10"
            >
                <Box>
                    <Text variant={'heading1Bold'} color={'black.1'}>
                        What if your dapp users don&apos;t have to
                    </Text>

                    <TextFade
                        textList={[
                            'pay gas fees..',
                            'have to Metamask installed..',
                            'switch networks..',
                        ]}
                        textColorList={['mulberry', 'blue.1', 'amaranth']}
                        cooldownTime={3}
                        morphTime={0.5}
                        variant={'heading1Bold'}
                        color={'black.1'}
                    />
                </Box>

                <Card h="650px" my="10" borderRadius={'24px'}>
                    <Flex h="100%">
                        <Box w="50%" py={'10'} px={12} h="100%">
                            <Text variant="heading1Bold" color={'black.1'}>
                                Meet Zero.
                            </Text>
                            <Text variant="heading1Bold" color={'black.3'}>
                                Gasless transactions for your Dapp.
                            </Text>
                            <Button variant={'primary2'} mt="20" onClick={handleClick}>
                                <Text variant={'heading3Bold'} color="white">
                                    Add Zero to Your Dapp
                                </Text>
                            </Button>
                        </Box>
                        <Spacer />
                        <Image
                            w="50%!"
                            borderRadius={'24px'}
                            src="/images/gastank.svg"
                            alt="gas tank"
                            // fill={'cover'}
                            objectFit="cover"
                            mr={0}
                        />
                    </Flex>
                </Card>

                <Card h="600px" my="10" borderRadius={'24px'}>
                    <Flex h="100%">
                        <Box w="50%" py={'10'} px={12} h="100%">
                            <Text
                                variant="heading2Bold"
                                color={'black.1'}
                                as={'span'}
                            >
                                Pricing.{' '}
                            </Text>
                            <Text
                                variant="heading2Bold"
                                color={'black.3'}
                                as="span"
                            >
                                If the gas fees is $1, we charge you $1.02. Just
                                a nominal 2% to keep the lights on in our
                                datacenters.
                                <br />
                                <br />
                                Your users always pay $0.
                            </Text>
                            <br />
                            <Button variant={'primary2'} mt="20" onClick={handleClick}>
                                <Text variant={'heading3Bold'} color="white">
                                    Add Zero to Your Dapp
                                </Text>
                            </Button>
                        </Box>
                        <Image
                            w="50%!"
                            borderRadius={'24px'}
                            src="/images/keys.svg"
                            alt="keys"
                            // fill={'cover'}
                            objectFit="cover"
                            mr={0}
                        />
                    </Flex>
                </Card>
            </Box>
        </>
    )
}
