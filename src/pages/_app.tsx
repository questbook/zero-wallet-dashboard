import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import { chain, createClient, WagmiConfig } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import {
    ZeroWalletConnector,
    ZeroWalletConnectorOptions,
} from 'zero-wallet-wagmi-connector'
import { ChakraProvider } from '@chakra-ui/react'
import { createContext, useState } from 'react'
import { EntityType, IProject } from '@/types'
import theme from '@/theme'

const zeroWalletConnectorOptions: ZeroWalletConnectorOptions = {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    zeroWalletServerDomain: process.env.NEXT_PUBLIC_BACKEND_DOMAIN!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    zeroWalletProjectApiKey: process.env.NEXT_PUBLIC_ZERO_WALLET_API_KEY!,
}

const connector = new ZeroWalletConnector({
    chains: [chain.goerli],
    options: zeroWalletConnectorOptions,
})

const provider = getDefaultProvider(chain.goerli.id)

const client = createClient({
    autoConnect: false,
    provider,
    connectors: [
        // new MetaMaskConnector({
        //     chains: [chain.goerli],
        //     options: {
        //         shimDisconnect: true,
        //     },
        // }),
        connector,
    ],
})

export const ProjectsContext = createContext<{
    doesScwExist: boolean
    setDoesScwExist: (newState: boolean) => void
    projects: IProject[] | null
    setProjects: (projects: IProject[]) => void
    selectedEntity: EntityType | null
    setSelectedEntity: (entry: EntityType | null) => void
} | null>(null)

export default function App({ Component, pageProps }: AppProps) {
    const [projects, setProjects] = useState<IProject[] | null>(null)
    const [selectedEntity, setSelectedEntity] = useState<EntityType | null>(
        null
    )
    const [doesScwExist, setDoesScwExist] = useState<boolean>(false)

    const projectsContextValue = {
        projects,
        setProjects,
        selectedEntity,
        setSelectedEntity,
        doesScwExist,
        setDoesScwExist,
    }

    return (
        <WagmiConfig client={client}>
            <ChakraProvider theme={theme}>
                <ProjectsContext.Provider value={projectsContextValue}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ProjectsContext.Provider>
            </ChakraProvider>
        </WagmiConfig>
    )
}
