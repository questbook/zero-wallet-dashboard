import { Button, Flex, Text } from '@chakra-ui/react'
import DomainInput from './DomainInput'

interface Props {
    setDomains: (newDomains: Array<string>) => void
    domains: Array<string>
    domainsError: string
}

export default function CreateProjectDomainInput({
    setDomains,
    domains,
    domainsError,
}: Props) {
    console.log(domainsError)

    return (
        <Flex flexDirection={'column'}>
            {domains.length > 0 &&
                domains.map((_: string, index: number) => {
                    return (
                        <>
                            <DomainInput
                                key={'domain-' + index}
                                index={index}
                                domains={domains}
                                setDomains={setDomains}
                            />

                            {index !== domains.length - 1 && (
                                <div
                                    key={'line-' + index}
                                    style={{
                                        borderBottomColor: 'black',
                                        borderBottomWidth: 1,
                                        width: '720px',
                                    }}
                                />
                            )}
                        </>
                    )
                })}

            <Text mb={10}>{domainsError}</Text>

            <Button
                backgroundColor={'#E0DCD5'}
                borderRadius={'27px'}
                alignItems="flex-end"
                fontStyle={'normal'}
                fontWeight={'700'}
                fontSize={'24px'}
                color="#403D39"
                lineHeight={'32px'}
                padding="10px 20px"
                width="316px"
                height="52px"
                onClick={() => {
                    setDomains([...domains, ''])
                }}
            >
                Add another domain
            </Button>
        </Flex>
    )
}
