import React from 'react'
import {
    Button,
    Flex,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

interface ListItem {
    iconPath?: string
    label: string
    value: number
}

interface DropdownProps {
    listItems: ListItem[]
    handleChange: (newValue: ListItem) => void
    selectedItem: ListItem
    backgroundColor?: string
    borderRightRadius?: string
}

const defaultProps = {
    listItemsMinWidth: '0',
    label: '',
    value: '',
    handleChange: null,
    defaultIndex: 0,
    addERC: false,
}

function SingleElement({ listItem }: { listItem: ListItem }) {
    return (
        <Flex p={2} gap={3}>
            {listItem.iconPath && (
                <Image
                    src={listItem.iconPath}
                    alt={`${listItem.label} icon`}
                    m="1"
                />
            )}
            <Text m="1" variant={'heading3Bold'}>
                {listItem.label}
            </Text>
        </Flex>
    )
}

function Dropdown({
    listItems,
    handleChange,
    selectedItem,
    backgroundColor,
    borderRightRadius,
}: DropdownProps) {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <MenuButton
                backgroundColor={backgroundColor}
                as={Button}
                px={4}
                py={2}
                w="220px"
                transition="all 0.2s"
                borderRadius="md"
                borderRightRadius={borderRightRadius}
                borderWidth="1px"
                _hover={{ bg: 'gray.400' }}
                _expanded={{ bg: 'blue.400' }}
                _focus={{ boxShadow: 'outline' }}
                rightIcon={<ChevronDownIcon />}
                onClick={() => {
                    if (!handleChange) {
                        return
                    }

                    setIsOpen(!isOpen)
                }}
            >
                <SingleElement listItem={selectedItem} />
            </MenuButton>
            <MenuList>
                {listItems.map((item) => (
                    <React.Fragment key={item.label}>
                        <MenuItem
                            onClick={(e) => {
                                e.preventDefault()
                                handleChange(item)
                            }}
                        >
                            <SingleElement listItem={item} />
                        </MenuItem>
                    </React.Fragment>
                ))}
            </MenuList>
        </Menu>
    )
}

Dropdown.defaultProps = defaultProps
export default Dropdown
