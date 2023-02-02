
import { motion, isValidMotionProp } from 'framer-motion';
import { chakra, shouldForwardProp, Text, TextProps } from '@chakra-ui/react'
import { useEffect, useState } from 'react';

type Props = TextProps & {
    textList: string[];
    textColorList: string[];
    cooldownTime: number;
    morphTime: number;
}


const variants = {
    enter: (direction: number) => {
        return {
            y: direction > 0 ? 10 : -10,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        y: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            y: direction < 0 ? 10 : -10,
            // opacity: 0
        };
    }
};

const ChakraBox = chakra(motion.div, {
    /**
     * Allow motion props and non-Chakra props to be forwarded.
     */
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

export default function TextFade({ textList, cooldownTime, morphTime, textColorList, ...rest }: Props) {

    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const textListLength = textList.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex(lastTextIndex => (lastTextIndex + 1) % textListLength);
        }, cooldownTime * 1000);

        return () => clearInterval(interval);
    }, [cooldownTime, textListLength])

    return (
        <ChakraBox
            // as={Text}
            // variant={'heading1'}
            variants={variants}
            initial={variants.enter(1)}
            animate={'center'}
            exit={variants.exit(1)}
            key={currentTextIndex}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore no problem in operation, although type error appears.
            transition={{
                duration: morphTime,
                ease: "easeInOut",
                repeatType: "loop",
            }}
            m={'0'}
        >
            <Text
                {...rest}
                color={textColorList[currentTextIndex]}
            >
                {textList[currentTextIndex]}
            </Text>

        </ChakraBox>
    )
}
