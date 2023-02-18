import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Text,
    Image,
} from '@chakra-ui/react'

interface Props {
    isOpen: boolean
}

export default function ProjectGasTanksCreationModal({ isOpen }: Props) {
    return (
        <Modal isOpen={isOpen} onClose={() => 0}>
            <ModalOverlay />
            <ModalContent minW="60%" borderRadius="24px" py={10} mt="10%">
                <ModalHeader
                    display={'flex'}
                    justifyContent="center"
                    alignItems="center"
                    mb={5}
                >
                    <Image src="/assets/Rectangle.svg" alt="anime" />
                </ModalHeader>
                <ModalBody
                    display={'flex'}
                    justifyContent="center"
                    alignItems="center"
                    textAlign={'center'}
                    mb={5}
                >
                    <Text variant="heading1Bold">Setting up your gas tank</Text>
                </ModalBody>

                <ModalFooter
                    display={'flex'}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Text variant="heading3Regular">
                        Few seconds remaining..
                    </Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
