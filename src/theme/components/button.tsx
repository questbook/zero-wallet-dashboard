const buttons = {
    Button: {
        baseStyle: {
            fontWeight: '500',
            _hover: { boxShadow: 'none' },
            _focus: { boxShadow: 'none' },
            _active: { boxShadow: 'none' },
        },
        variants: {
            primary: {
                height: 12,
                px: 12,
                bg: 'brand.500',
                _hover: { background: 'brand.600' },
                _active: { background: 'brand.700' },
                _disabled: {
                    background: '#D0D3D3',
                },
                py: 3,
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
                lineHeight: '24px',
                borderRadius: '8px',
            },
            primaryCta: {
                height: 8,
                px: 6,
                bg: 'brand.500',
                _hover: { background: 'brand.600' },
                _active: { background: 'brand.700' },
                _disabled: {
                    background: '#D0D3D3',
                },
                py: '6px',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
                lineHeight: '24px',
            },
            resubmit: {
                height: 12,
                px: 12,
                bg: '#F3F4F4',
                _hover: {
                    background: '#F5F5F5',
                    borderColor: '#122224',
                    borderWidth: '2px',
                },
                _active: { background: '#F5F5F5' },
                py: 3,
                color: 'black',
                fontWeight: 'bold',
                fontSize: '16px',
                lineHeight: '24px',
            },
            reject: {
                height: 12,
                px: 12,
                bg: 'white',
                _hover: { background: '#F5F5F5' },
                _active: { background: '#F5F5F5' },
                py: 3,
                color: 'red',
                fontWeight: 'bold',
                fontSize: '16px',
                lineHeight: '24px',
                border: '1px solid red',
            },
            disconnect: {
                height: 12,
                px: 12,
                bg: 'white',
                _hover: { background: '#F5F5F5' },
                _active: { background: '#F5F5F5' },
                py: 3,
                color: 'grey',
                fontWeight: 'bold',
                fontSize: '16px',
                lineHeight: '24px',
                border: '1px solid grey',
            },
            manageGrantTab: {
                margin: '10px',
                fontSize: '20px',
                padding: '15px',
                textAlign: 'center',
                textTransform: 'uppercase',
                backgroundSize: '200% auto',
                color: '#FFF',
                borderRadius: '10px',
                width: '200px',
                boxShadow:
                    '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
                cursor: 'pointer',
                display: 'inline-block',
                _hover: {
                    boxShadow:
                        '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                    margin: '8px 10px 12px',
                    backgroundPosition: 'right center',
                },
                backgroundImage:
                    'linear-gradient(to right, #DD5E89 0%, #F7BB97 51%, #DD5E89 100%)',
            },
            primaryV2: {
                bg: '#1F1F33',
                color: '#ffffff',
                lineHeight: '1.25rem',
                height: '36px',
                '&:hover': {
                    bg: '#3F3F53',
                },
                '&:active': {
                    bg: '#5F5F72',
                },
                '&:disabled': {
                    bg: '#E0E0EC',
                    opacity: 1,
                    color: '#AFAFCC',
                    '&:hover': {
                        bg: '#E0E0EC',
                    },
                },
            },
            primaryLightV2: {
                bg: '#1F1F33',
                color: '#ffffff',
                lineHeight: '1.25rem',
                '&:hover': {
                    bg: '#3F3F53',
                },
                '&:active': {
                    bg: '#5F5F72',
                },
                '&:disabled': {
                    bg: '#E0E0EC',
                    opacity: 1,
                    color: 'white',
                    '&:hover': {
                        bg: '#E0E0EC',
                    },
                },
            },
            secondaryV2: {
                bg: 'gray.3',
                color: 'black.1',
                lineHeight: '1.25rem',
                borderRadius: '2px',
                '&:hover': {
                    bg: 'gray.2',
                },
                '&:active': {
                    bg: 'gray.4',
                },
                '&:focus': {
                    bg: 'gray.4',
                    border: '1px solid black.3',
                    borderRadius: '2px',
                },
                '&:disabled': {
                    bg: 'gray.3',
                    opacity: 1,
                    color: 'gray.5',
                    '&:hover': {
                        bg: 'gray.3',
                    },
                },
            },
            linkV2: {
                bg: 'none',
                color: 'black.3',
                h: 8,
                px: 3,
                _hover: {
                    bg: 'gray.2',
                },
                _focus: {
                    bg: 'gray.3',
                    border: '1px solid gray.4',
                },
                _disabled: {
                    color: 'gray.5',
                },
                py: 2,
            },
            link: {
                bg: 'white',
                color: 'black.3',
                fontWeight: '500',
                fontSize: '16px',
                lineHeight: '24px',
            },
            primaryLarge: {
                bg: '#0A84FF',
                color: 'white',
                paddingY: '14px',
                paddingX: '40px',
                fontWeight: '500',
                h: '48px',
                borderRadius: '2px',
            },
            primaryMedium: {
                bg: 'accent.azure',
                color: 'white',
                paddingY: '8px',
                paddingX: '16px',
                fontWeight: '500',
                fontSize: '14px',
                lineHeight: '24px',
                // w: '170px', // Note: the values for height and width will be changed
                h: '32px',
                borderRadius: '2px',
                _disabled: {
                    bg: '#E7E4DD',
                    color: '#8D8B87',
                },
            },
            menuButton: {
                borderRadius: '2px',
                color: 'black.1',
                '&:disabled': {
                    bg: 'gray.3',
                    opacity: 1,
                    '&:hover': {
                        bg: 'gray.3',
                    },
                },
            },
            primary2: {
                padding: '10px 20px',
                background: '#EC5D2A',
                borderRadius: '27px',
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '24px',
                lineHeight: '32px',
                _hover: { background: 'red' },
            },
        },
    },
}

export default buttons
