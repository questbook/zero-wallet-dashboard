import CopyableText from '@/components/UI/CopyableText'
import { IProject } from '@/types'
import {
    Card,
    Text,
    Flex,
    Button,
    Image,
    Box,
    Divider,
    useClipboard,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import SingleGasTankFiller from './SingleGasTankFiller'

interface Props {
    project: IProject
}

export default function SingleProject({ project }: Props) {
    const router = useRouter()
    const code = `\
const zeroWalletConnectorOptions: 
    ZeroWalletConnectorOptions = {
    zeroWalletProjectApiKey: <YOUR-API-KEY>,
}
const connector = new ZeroWalletConnector({
    chains: <CHAINS-LIST>,
    options: zeroWalletConnectorOptions,
}) \
    `
    const { onCopy } = useClipboard(code)

    return (
        <Card borderRadius="24px" backgroundColor="white" p="10" my="50">
            <Flex flexDirection={'row'} mb="20">
                <Text variant="heading1Bold" lineHeight="100%">
                    {project.name}
                </Text>

                <Button
                    onClick={() =>
                        router.push(`/editProject/${project.project_id}`)
                    }
                    variant={'secondary2'}
                    ml="auto"
                    gap={2}
                >
                    <Image src="/assets/Edit.svg" alt="" />
                    <Text variant={'heading3Bold'}>Edit Dapp</Text>
                </Button>
            </Flex>

            <Flex>
                <Box w="55%" overflow="hidden">
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
                    h="fit-content"
                >
                    <Text
                        color={'inherit'}
                        variant="code"
                        wordBreak={'break-word'}
                        overflow="auto"
                        p="2"
                        as="pre"
                    >
                        {/* const zeroWalletConnectorOptions: ZeroWalletConnectorOptions = {'{'} <br />
                        &emsp; zeroWalletProjectApiKey: {'<'}YourPrivateKey{'>'}
                        <br />
                        {'}'}
                        <br />
                        const connector = new ZeroWalletConnector({'{'} <br />
                        &emsp; chains: [chain.goerli], <br />
                        &emsp; options: zeroWalletConnectorOptions, <br />
                        {'}'}) */}
                        {code}
                    </Text>

                    <br />
                    <br />
                    <Button variant="primary2">
                        <Text
                            variant={'heading3Bold'}
                            color="inherit"
                            onClick={onCopy}
                        >
                            Copy Code
                        </Text>
                    </Button>
                </Box>
            </Flex>
        </Card>
    )
}
