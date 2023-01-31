import { useContext, useEffect, useState } from 'react'
import { useSigner } from 'wagmi'
import { ZeroWalletSigner } from 'zero-wallet-wagmi-connector'
import { ProjectsContext } from '../../pages/_app'
import { IBase } from '../types'

export default function useOwnerAndWebHookAttributes() {
    const { doesScwExist } = useContext(ProjectsContext)!
    const { data: signer } = useSigner<ZeroWalletSigner>()
    const [webHookAttributes, setWebHookAttributes] = useState<IBase>()

    useEffect(() => {
        if (!signer) return
        if (!doesScwExist) return
        const getWebHookAttributes = async () => {
            const nonce = await signer.getNonce()
            setWebHookAttributes({
                ownerScw: signer.getScwAddress() || '',
                webHookAttributes: {
                    nonce,
                    signedNonce: await signer.signNonce(nonce),
                },
            })
        }

        getWebHookAttributes()
    }, [signer, doesScwExist])

    return webHookAttributes
}
