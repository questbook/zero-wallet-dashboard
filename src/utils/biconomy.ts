import { GasTankBalanceType } from '@/types'
import axios from 'axios'

export async function getGasTankBalance(
    gasTankApiKey: string,
    authToken: string
) {
    const url = 'https://data.biconomy.io/api/v1/dapp/gas-tank-balance'
    const requestOptions = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            authToken: authToken,
            apiKey: gasTankApiKey,
        },
    }
    const { data } = await axios.get<GasTankBalanceType>(url, requestOptions)
    return data.dappGasTankData.effectiveBalanceInStandardForm
}
