import { motion, isValidMotionProp, AnimatePresence } from 'framer-motion'
import { Box, chakra, shouldForwardProp, Text, TextProps } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

type Props = TextProps & {
    textList: string[]
    textColorList: string[]
    cooldownTime: number
    morphTime: number
}

const variants = {
    enter: () => {
        return {
            y: 50,
            opacity: 0,
        }
    },
    center: {
        zIndex: 1,
        y: 0,
        opacity: 1,
    },
    exit: () => {
        return {
            zIndex: 0,
            y: -20,
            opacity: 0,
        }
    },
}

const ChakraBox = chakra(motion.div, {
    /**
     * Allow motion props and non-Chakra props to be forwarded.
     */
    shouldForwardProp: (prop) =>
        isValidMotionProp(prop) || shouldForwardProp(prop),
})

export default function TextFade({
    textList,
    cooldownTime,
    morphTime,
    textColorList,
    ...rest
}: Props) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const textListLength = textList.length

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex(
                (lastTextIndex) => (lastTextIndex + 1) % textListLength
            )
        }, cooldownTime * 1000)

        return () => clearInterval(interval)
    }, [cooldownTime, textListLength])

    return (
        <Box overflow={'hidden'} p='1'>
            <AnimatePresence mode='popLayout' initial={false}>
                <ChakraBox
                    variants={variants}
                    initial={'enter'}
                    animate={'center'}
                    exit={'exit'}
                    key={currentTextIndex}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore no problem in operation, although type error appears.
                    transition={{
                        duration: morphTime,
                        delay: 0.05,
                        ease: 'easeInOut',
                        repeatType: 'loop',
                    }}
                >
                    <Text {...rest} color={textColorList[currentTextIndex]}>
                        {textList[currentTextIndex]}
                    </Text>
                </ChakraBox>
            </AnimatePresence>
        </Box>
    )
}
