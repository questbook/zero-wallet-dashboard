import axios from 'axios'

export async function postFetcher<T>(
    args: [string, unknown]
): Promise<T | null> {
    const [input, requestData] = args
    if (!requestData) return null
    const { data } = await axios.post(input, requestData)
    if (data.error || data.errors) {
        return null
    }

    return data
}
