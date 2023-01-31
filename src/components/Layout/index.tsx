import { Flex, Spacer } from '@chakra-ui/react'
import Footer from './Footer'
import Header from './Header'

type DashboardLayoutProps = {
    children: React.ReactNode
}

export default function Layout({ children }: DashboardLayoutProps) {
    return (
        <Flex direction="column" minH="100vh">
            <Header />
            <main>{children}</main>
            <Spacer />
            <Footer />
        </Flex>
    )
}
