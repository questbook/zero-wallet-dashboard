import { SupportedChainIds } from '@/constants/chains'
import contractAbi from './abi.json'

const ADDRESS_BY_CHAIN_ID: {
    [key in SupportedChainIds]: string
} = {
    [SupportedChainIds.POLYGON]: '0xeb808ba857a080d35554fe5830dc61df1ba53e0c',
    [SupportedChainIds.OPTIMISM]: '0x5Bc7c8cFC6d54c055547Fcd8f6Ee4f2eDcda613e',
    [SupportedChainIds.CELO]: '0xEb394FE49C745D29564B3cC362530031FC741b01',
    [SupportedChainIds.GOERLI]: '0x7Ad7AD90409977c3A3B5f63D7b4e5530b87c9Cc3',
}

export { contractAbi as abi, ADDRESS_BY_CHAIN_ID }
