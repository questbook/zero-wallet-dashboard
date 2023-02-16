import TextField from '@/components/UI/TextField/TextField'
import { CloseIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Text, Image } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { isValidUrl } from '@/utils/checkers'

interface Props {
    index: number
    domains: string[]
    setDomains: (newDomains: string[]) => void
}

export default function DomainModifier({ index, domains, setDomains }: Props) {
    const [domainState, setDomainState] = useState(0)
    useEffect(() => {
        if (domains[index]) {
            if (!isValidUrl(domains[index])) {
                setDomainState(1)
            } else {
                setDomainState(0)
            }
        }
    }, [index, domains, domainState])

    const searchStateMap = useMemo(() => {
        return [
            ['', <></>],
            [
                'This is not a valid domain.',
                <Image
                    display={{ lg: 'inherit' }}
                    src="/assets/Warning.svg"
                    alt="Warning"
                    cursor="pointer"
                    key={2}
                />,
            ],
        ]
    }, [])

    return (
        <Flex
            flexDirection={'row'}
            gap={10}
            mb={domains.length === 0 ? 10 : 5}
            mt={index > 0 ? 5 : 0}
        >
            <Flex flexDirection={'row'} gap={10}>
                <Flex flexDirection={'column'}>
                    <TextField
                        key={'domain-input-' + index}
                        placeholder={'www.sample.com'}
                        value={domains[index]}
                        fontSize={'24px'}
                        fontWeight={'700'}
                        width={'720px'}
                        onChange={(e) => {
                            const newDomains = [...domains]
                            newDomains[index] = e.target.value
                            setDomains(newDomains)
                        }}
                    />

                    {domains[index] && (
                        <Flex flexDirection={'row'} width={'100%'} gap={'10px'}>
                            {searchStateMap[domainState][1]}
                            <Text>{searchStateMap[domainState][0]}</Text>
                        </Flex>
                    )}
                </Flex>
            </Flex>
            {domains.length > 1 && (
                <IconButton
                    borderColor={'#E0DCD5'}
                    backgroundColor={'#FFFFFF'}
                    icon={<CloseIcon />}
                    aria-label={''}
                    mt={2}
                    border={'1px solid #E0DCD5'}
                    borderRadius={'8px'}
                    onClick={() => {
                        const newDomains = [...domains]
                        newDomains.splice(index, 1)
                        setDomains(newDomains)
                    }}
                />
            )}
        </Flex>
    )
}
