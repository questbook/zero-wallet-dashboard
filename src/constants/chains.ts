enum SupportedChainIds {
    GOERLI = 5,
    POLYGON = 137,
    OPTIMISM = 10,
    CELO = 42220,
}

const CHAIN_NAMES: {
    [key in SupportedChainIds]: string
} = {
    [SupportedChainIds.GOERLI]: 'Goerli',
    [SupportedChainIds.POLYGON]: 'Polygon',
    [SupportedChainIds.OPTIMISM]: 'Optimism',
    [SupportedChainIds.CELO]: 'Celo',
}

const CHAIN_ICONS: {
    [key in SupportedChainIds]: string
} = {
    [SupportedChainIds.POLYGON]: '/ui_icons/networks/polygon.svg',
    [SupportedChainIds.OPTIMISM]: '/ui_icons/networks/optimism.svg',
    [SupportedChainIds.CELO]: '/ui_icons/networks/celo.svg',
    [SupportedChainIds.GOERLI]: '/ui_icons/networks/goerli.svg',
}

export const DEFAULT_CHAIN = SupportedChainIds.POLYGON

export { SupportedChainIds, CHAIN_NAMES, CHAIN_ICONS }
