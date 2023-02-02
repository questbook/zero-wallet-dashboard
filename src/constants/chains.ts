enum SupportedChainIds {
    GOERLI = 5,
    POLYGON = 137,
    OPTIMISM = 10,
    CELO = 42220,
}

const CHAIN_NAMES = {
    [SupportedChainIds.GOERLI]: 'Goerli',
    [SupportedChainIds.POLYGON]: 'Polygon',
    [SupportedChainIds.OPTIMISM]: 'Optimism',
    [SupportedChainIds.CELO]: 'Celo',
}

export { SupportedChainIds, CHAIN_NAMES }
