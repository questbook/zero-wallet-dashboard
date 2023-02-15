import React, { useEffect } from 'react'
import {
    Flex,
    FlexProps,
    Text,
    useClipboard,
    Image,
    Button,
} from '@chakra-ui/react'


interface Props extends FlexProps {
    label?: string
    value: string
}

function CopyableText({
    label,
    placeholder,
    value,
    ...props
}: Props) {

    const { onCopy, setValue } = useClipboard("");

    useEffect(() => {
        setValue(value)
    }, [setValue, value])

    return (
        <Flex direction="column" {...props} gap={2}>
            <Flex>
                {label && (
                    <Text
                        variant="v2_body"
                        fontWeight="700"
                        fontSize={'14px'}
                        lineHeight={'20px'}
                        textTransform="uppercase"
                        color={'#403D39'}
                    >
                        {label}
                    </Text>
                )}
            </Flex>
            <Flex
                borderRadius='8px'
                border={'1px solid #E0DCD5'}
                px='3'
                py='2'
                height={'100%'}
                justifyContent='center'
                alignItems={'center'}
            >
                <Text
                    placeholder={placeholder}
                    variant='heading3Bold'
                    color="black.1"
                    h='100%'
                    lineHeight={'100%!'}
                >
                    {value}
                </Text>

                <Button
                    ml='auto'
                    onClick={onCopy}
                    p='0'
                    // h='100%!'
                    display={'flex'}
                    justifyContent='center'
                    alignItems={'center'}
                    flexDirection='column'
                >
                    <Image
                        m='0'
                        src='/assets/Copy.svg'
                        alt=''
                    />
                </Button>

            </Flex>


        </Flex>
    )
}

export default CopyableText
