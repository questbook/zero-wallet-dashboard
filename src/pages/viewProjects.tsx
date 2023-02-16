import Projects from '@/components/screens/ViewProjects/Projects'
import { Button, Flex, Text, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { ProjectsContext } from './_app'

export default function ViewProject() {
    const { projects } = useContext(ProjectsContext)!
    const router = useRouter()

    if (projects === null) {
        return null
    }

    if (projects.length === 0) {
        router.push('/')
    }

    return (
        <Box p="5">
            <Flex mb="50" alignItems={'center'} justifyContent="center">
                <Text variant="heading1Bold" lineHeight="100%">
                    My Dapps
                </Text>
                <Button
                    variant="primary2"
                    ml="auto"
                    onClick={() => {
                        router.push('/createProject')
                    }}
                >
                    <Text variant={'heading3Bold'} color={'inherit'}>
                        Add new Dapp
                    </Text>
                </Button>
            </Flex>

            <Projects projects={projects} />
        </Box>
    )
}
