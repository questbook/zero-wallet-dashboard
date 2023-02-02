import { ChangeEventHandler } from 'react'
import React from 'react'
import { CheckIcon } from '@chakra-ui/icons'
import { Box, Flex, FlexProps, Input, InputGroup, InputRightElement, Link, Text } from '@chakra-ui/react'

interface Props extends FlexProps {
    label?: string
    optionalText?: string
    helperText?: string
    helperLinkText?: string
    helperLinkUrl?: string
    placeholder?: string
    maxLength?: number
    value: string | number
    onChange: ChangeEventHandler<HTMLInputElement>
    errorText?: string
    onPasteClick?: () => void
    isVerified?: boolean
    isDisabled?: boolean
}

function TextField({ label, optionalText, helperText, helperLinkText, helperLinkUrl, placeholder, maxLength, value, onChange, isVerified, isDisabled, errorText, onPasteClick, ...props }: Props) {
    const [currentLength, setCurrentLength] = React.useState(value?.toString().length)
    React.useEffect(() => {
        setCurrentLength(value?.toString().length)
    }, [value])

    return (
        <Flex
            direction='column'
            {...props}
            gap={2}
        >
            <Flex>
                {
                    label && (
                        <Text
                            variant='v2_body'
                            fontWeight='700'
                            fontSize={'14px'}
                            lineHeight={'20px'}
                            textTransform='uppercase'
                            color={'#403D39'}
                        >
                            {label}
                        </Text>
                    )
                }
            </Flex>
            {
                helperText && (
                    <Text
                        variant='v2_metadata'
                        color='black.3'>
                        {helperText}
                        {' '}
                        {
                            helperLinkText && (
                                <Link
                                    display='inline-block'
                                    fontWeight='500'
                                    color='black.3'
                                    isExternal
                                    href={helperLinkUrl}>
                                    {helperLinkText}
                                </Link>
                            )
                        }
                    </Text>
                )
            }
            <InputGroup>
                <Input
                    placeholder={placeholder}
                    fontWeight='700'
                    fontSize='24px'
                    lineHeight='32px'
                    maxLength={maxLength}
                    color='black.1'
                    onChange={onChange}
                    value={value}
                    errorBorderColor='orange.2'
                    isDisabled={isDisabled}
                    onWheel={(e) => (e.target as HTMLElement).blur()}
                />
                {
                    optionalText && (
                        <Text
                            ml={1}
                            variant='v2_metadata'
                            color='black.3'>
                            {optionalText}
                        </Text>
                    )
                }
            </InputGroup>
            <Flex mt={1}>
                {
                    errorText && errorText !== '' && (
                        <Text
                            color='orange.500'>
                            {errorText}
                        </Text>
                    )
                }
            </Flex>
        </Flex>
    )
}

export default TextField