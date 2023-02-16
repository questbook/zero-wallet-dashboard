import { getProjects } from '@/api'
import useOwnerAndWebHookAttributes from '@/hooks/useOwnerAndWebHookAttributes'
import { ProjectsContext } from '@/pages/_app'
import { Flex, Spacer, Spinner } from '@chakra-ui/react'
import { createContext, useCallback, useContext, useEffect } from 'react'
import { useConnect, useSigner } from 'wagmi'
import { ZeroWalletSigner } from 'zero-wallet-wagmi-connector'
import Footer from './Footer'
import Header from './Header'

type DashboardLayoutProps = {
    children: React.ReactNode
}

export const ProjectUpdater = createContext<{
    updateProjects: () => void
} | null>(null)

export default function Layout({ children }: DashboardLayoutProps) {
    const { setProjects, doesScwExist, setDoesScwExist, projects } =
        useContext(ProjectsContext)!
    const ownerAndWebHookAttributes = useOwnerAndWebHookAttributes()
    const { data: signer } = useSigner<ZeroWalletSigner>()
    const { connect, connectors } = useConnect()

    useEffect(() => {
        const func = async () => {
            if (signer && !doesScwExist) {
                try {
                    try {
                        await signer.authorize()
                    } catch {}

                    await signer.deployScw()
                    setDoesScwExist(true)
                } catch {}
            }
        }

        func()
    }, [signer, doesScwExist, setDoesScwExist])

    const updateProjects = useCallback(async () => {
        if (signer && doesScwExist && ownerAndWebHookAttributes?.ownerScw) {
            const projects = await getProjects(ownerAndWebHookAttributes)
            setProjects(projects)
        }
    }, [doesScwExist, ownerAndWebHookAttributes, setProjects, signer])

    useEffect(() => {
        updateProjects()
    }, [doesScwExist, ownerAndWebHookAttributes, updateProjects])

    useEffect(() => {
        connect({ connector: connectors[0] })
    }, [connect, connectors])

    return (
        <Flex direction="column" minH="100vh">
            <Header />
            <ProjectUpdater.Provider value={{ updateProjects }}>
                <main>
                    {projects === null ? (
                        <Flex
                            width={'100vw'}
                            h={'70vh'}
                            flexDirection={'column'}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <Spinner size={'xl'} />
                        </Flex>
                    ) : (
                        children
                    )}
                </main>
            </ProjectUpdater.Provider>
            <Spacer />
            <Footer />
        </Flex>
    )
}
