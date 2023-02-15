import { GasTankType } from '@/types'
import { Box, Divider, Text } from '@chakra-ui/react'
import React from 'react'
import GasTankFiller from './SingleGasTankFiller'


interface Props {
    gasTanks: GasTankType[]
}

export default function FillGasTanks({
    gasTanks,
}: Props) {
    return (
        <Box
            p='5'
        >
            <Text
                variant='heading1Bold'
                color={'black.1'}
            >
                Add gas to your contract tanks
            </Text>
            <br />
            <Text
                variant={'heading3Regular'}
                color={'black.1'}
            >
                Your gas tanks are deployed on the same network as your contracts.
            </Text>
            <br />
            <Text
                variant={'heading3Bold'}
            >
                Your contract tanks
            </Text>
            <br />

            {
                gasTanks.map((gasTank, index) => {
                    return (
                        <React.Fragment
                            key={gasTank.gas_tank_id}
                        >
                            <GasTankFiller
                                key={gasTank.gas_tank_id}
                                gasTank={gasTank}
                            />

                            {
                                index !== gasTanks.length - 1 && (
                                    <Divider
                                        m={5}
                                        w='60%'
                                    />
                                )

                            }
                        </React.Fragment>
                    )
                })
            }
        </Box>

    )
}
