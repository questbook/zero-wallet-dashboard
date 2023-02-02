import TextField from '@/components/UI/TextField/TextField';
import { Button, Image, Text, Input, InputGroup } from '@chakra-ui/react'
import TextVariants from '@/theme/components/text';

interface Props {
	setName: (newName: string) => void;
	name: string;
	errorText: string;
}

export default function CreateProjectNameInput({
	setName,
	name,
	errorText
}: Props) {
	return (
		<>
			<TextField
				label={'Dapp Name'}
				placeholder={'Axie Infinity'}
				value={name}
				fontSize={'24px'}
				fontWeight={'700'}
				width={'720px'}
				errorText={errorText}
				onChange={(e) => setName(e.target.value)}
			/>
		</>
	)
}