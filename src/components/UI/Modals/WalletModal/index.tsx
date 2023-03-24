import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Text,
    useClipboard,
    Button,
    ModalCloseButton,
} from '@chakra-ui/react'
import CopyableText from '@/components/UI/CopyableText'

interface Props {
    isOpen: boolean;
    setIsOpen: (newVal: boolean) => void
}

export default function WalletModal({ isOpen, setIsOpen }: Props) {
    const privateKey = localStorage.getItem('zeroWalletPrivateKey')
    const { onCopy } = useClipboard(privateKey || '')

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <ModalOverlay />
            <ModalContent minW="60%" borderRadius="24px" py={10} px={10} mt="10%">
                <ModalCloseButton />
                <ModalHeader
                    // display={'flex'}
                    // justifyContent="center"
                    // alignItems="center"
                    mb={5}
                >
                    <Text
                        variant={'heading1Bold'}
                    >
                        Save wallet key
                    </Text>
                    <br />
                    <Text
                        variant={'heading3Regular'}
                    >
                        Save your wallet private key to access your zero app account.
                    </Text>
                </ModalHeader>
                <ModalBody
                    // display={'flex'}
                    justifyContent="center"
                    alignItems="center"
                    // textAlign={'center'}
                    mb={5}
                >
                    <br />
                    <Text
                        variant={'heading3Regular'}
                    >
                        Don&#39;t share this key with anyone. Anyone who has your private key can access your account on Zero app.
                    </Text>
                    <br />
                    <CopyableText
                        value={privateKey || ''}
                        label="WALLET KEY"
                        w="100%"
                    />
                </ModalBody>

                <ModalFooter>
                    <Button
                        variant={'primary2'}
                        onClick={onCopy}
                        mr='auto'
                        px='48px'
                    >
                        <Text
                            variant="heading3Bold"
                            color={'inherit'}
                        >
                            Copy private key
                        </Text>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
