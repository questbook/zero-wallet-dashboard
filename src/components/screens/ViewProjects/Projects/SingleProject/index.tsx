import CopyableText from '@/components/UI/CopyableText'
import { IProject } from '@/types'
import { Card, Text, Flex, Button, Image, Box, Divider } from '@chakra-ui/react'
import { Fragment } from 'react'
import SingleGasTankFiller from './SingleGasTankFiller'

interface Props {
    project: IProject
}

export default function SingleProject({ project }: Props) {
    return (
        <Card borderRadius="24px" backgroundColor="white" p="10" my="50">
            <Flex flexDirection={'row'} mb="20">
                <Text variant="heading1Bold" lineHeight="100%">
                    {project.name}
                </Text>

                <Button variant={'secondary2'} ml="auto" gap={2}>
                    <Image src="/assets/Edit.svg" alt="" />
                    <Text variant={'heading3Bold'}>Edit Dapp</Text>
                </Button>
            </Flex>

            <Flex>
                <Box w="55%">
                    <CopyableText
                        value={project.project_api_key}
                        label="API KEY"
                        w="100%"
                    />

                    <br />
                    <Text variant="heading3Bold">Your Contract tanks</Text>
                    <Box>
                        {project.gasTanks.map((gasTank, index) => {
                            return (
                                <Fragment key={gasTank.gas_tank_id}>
                                    <SingleGasTankFiller gasTank={gasTank} />
                                    {index !== project.gasTanks.length - 1 && (
                                        <Divider m={5} w="100%" />
                                    )}
                                </Fragment>
                            )
                        })}
                    </Box>
                </Box>

                <Box
                    ml="auto"
                    backgroundColor={'#222222'}
                    borderRadius="24px"
                    w="37%"
                    p="10"
                    // py='20'
                    color="white"
                >
                    <Text color={'inherit'} variant="code">
                        const zeroWalletConnectorOptions:
                        ZeroWalletConnectorOptions = &#x2775;
                        jsonRpcProviderUrls: &#x2775;5:
                        `https://eth-goerli.g.alchemy.com/v2/$
                        {process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`, &#x2775;,
                        store: &rsquo;browser&rsquo;, zeroWalletServerDomain:
                        process.env.NEXT_PUBLIC_BACKEND_DOMA
                    </Text>

                    <br />
                    <br />
                    <Button variant="primary2">
                        <Text variant={'heading3Bold'} color="inherit">
                            Copy Code
                        </Text>
                    </Button>
                </Box>
            </Flex>
        </Card>
    )
}
