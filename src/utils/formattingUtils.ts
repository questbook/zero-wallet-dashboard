export const formatAddress = (address: string) =>
    `${address.substring(0, 4)}....${address.substring(address.length - 4)}`

export const formatAddressLong = (address: string) =>
    `${address.substring(0, 10)}....${address.substring(address.length - 10)}`
