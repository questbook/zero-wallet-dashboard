import { CheckIcon, CloseIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import {
    Flex,
    ButtonGroup,
    FlexProps,
    Editable,
    EditableInput,
    EditablePreview,
    useEditableControls,
    IconButton,
    Input,
} from '@chakra-ui/react'

interface Props {
    handleChange: (newVal: string) => void
    handleRemove?: () => void
    value: string
}

function EditableControls({ handleRemove }: { handleRemove?: () => void }) {
    const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
        <ButtonGroup justifyContent="center" size="sm" m="2" mr="auto" gap={5}>
            <IconButton
                icon={<CheckIcon />}
                aria-label={''}
                {...getSubmitButtonProps()}
            />
            <IconButton
                icon={<CloseIcon />}
                aria-label={''}
                {...getCancelButtonProps()}
            />
        </ButtonGroup>
    ) : (
        <ButtonGroup justifyContent="center" size="sm" m="2" mr="auto" gap={5}>
            <IconButton
                size="sm"
                icon={<EditIcon />}
                aria-label={''}
                {...getEditButtonProps()}
            />
            {!!handleRemove && (
                <IconButton
                    size="sm"
                    icon={<DeleteIcon />}
                    onClick={() => handleRemove()}
                    aria-label={'remove'}
                />
            )}
        </ButtonGroup>
    )
}

export default function InputUpdater({
    handleChange,
    handleRemove,
    value,
    ...rest
}: Props & FlexProps) {
    return (
        <Flex gap={5} {...rest}>
            <Editable
                defaultValue={value}
                value={value}
                onChange={(newVal) => handleChange(newVal)}
                textAlign="center"
                isPreviewFocusable={false}
                display="flex"
                alignItems="center"
            >
                <EditablePreview w="md" />
                <Input as={EditableInput} w="md" />
                <EditableControls handleRemove={handleRemove} />
            </Editable>
        </Flex>
    )
}
