import Projects from "@/components/screens/ViewProjects/Projects";
import { Button, Flex, Text, Box } from "@chakra-ui/react";
import { useRouter } from 'next/router'


export default function ViewProject() {

    const router = useRouter()

    return (
        <Box
            p='5'
        >
            <Flex
                mb='50'
                alignItems={'center'}
                justifyContent='center'
            >
                <Text
                    variant='heading1Bold'
                    lineHeight='100%'
                >
                    My Dapps
                </Text>
                <Button
                    variant='primary2'
                    ml='auto'
                    onClick={() => {
                        router.push('/createProject')
                    }}
                >
                    <Text
                        variant={'heading3Bold'}
                        color={'inherit'}

                    >
                        Add new Dapp
                    </Text>
                </Button>
            </Flex>
            
            <Projects />
            
        </Box>
    )
}
