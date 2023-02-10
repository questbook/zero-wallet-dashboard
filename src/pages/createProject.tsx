import CreateProjectComponent from '../components/screens/CreateProject'
import { Flex, Spinner, Text } from '@chakra-ui/react'
import { useConnect, useSigner } from 'wagmi'
import { ZeroWalletSigner } from 'zero-wallet-wagmi-connector'
import { useContext, useEffect } from 'react'
import { ProjectsContext } from './_app'

export default function CreateProject() {

    const { data: signer } = useSigner<ZeroWalletSigner>()
    const { connectAsync, connectors } = useConnect()
    const { doesScwExist, setDoesScwExist } =
        useContext(ProjectsContext)!;

    useEffect(() => {
        const func = async () => {
            if (signer) {
                try {
                    await signer.authorize();
                } catch { }
                try {
                    await signer.deployScw();
                    setDoesScwExist(true)
                } catch { }

            }
            else {
                await connectAsync({ connector: connectors[0] })
            }
        };
        func();
    }, [signer, connectAsync, connectors])

    if (!doesScwExist) {
        return (
            <Flex
                width={'100vw'}
                h={'70vh'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Spinner size={'xl'} />
            </Flex>
        )
    }

    return (
        <>
            <Flex ml={30} mr={30} flexDirection={'column'} gap={'96px'}>
                <Text fontSize={'64px'} fontWeight={'700'} lineHeight={'72px'}>
                    My Dapps
                </Text>
                <CreateProjectComponent />
            </Flex>
        </>
    )
}
