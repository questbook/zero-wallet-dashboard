import CreateProjectComponent from '../components/screens/CreateProject'
import { Flex, Text } from '@chakra-ui/react'

export default function CreateProject() {

    return (
        <>
            <Flex
                ml={30}
                mr={30} 
                flexDirection={'column'}
                gap={'96px'}
            >
                <Text
                    fontSize={'64px'}
                    fontWeight={'700'}
                    lineHeight={'72px'}
                >
                    My Dapps
                </Text>
                <CreateProjectComponent />
            </Flex>
        </>
    )
}
