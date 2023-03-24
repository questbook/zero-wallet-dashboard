import { updateProject } from '@/api'
import { ProjectUpdater } from '@/components/Layout'
import EditProjectCard from '@/components/screens/EditProject/EditProjectCard'
import { SupportedChainIds } from '@/constants/chains'
import useOwnerAndWebHookAttributes from '@/hooks/useOwnerAndWebHookAttributes'
import { isValidUrl } from '@/utils/checkers'
import { Flex, Button, Box, Text, useToast } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { ProjectsContext } from '../_app'

export default function EditProject() {
    const { updateProjects } = useContext(ProjectUpdater)!
    const { projects } = useContext(ProjectsContext)!
    const router = useRouter()
    const { id: projectId } = router.query

    const project = projects!.find((proj) => proj.project_id === projectId)

    const addressesAndChain = project?.gasTanks
        .map((gastank) => {
            return gastank.whitelist.map((address) => ({
                address,
                chainId: gastank.chain_id,
            }))
        })
        .flat()
    const orgContracts = addressesAndChain?.map((elem) => elem.address)
    const orgNetworks = addressesAndChain?.map(
        (elem) => elem.chainId as unknown as SupportedChainIds
    )

    const ownerAndWebHookAttributes = useOwnerAndWebHookAttributes()

    const [nameUpdated, setNameUpdated] = useState(project?.name || '')
    const [projectNameError, setProjectNameError] = useState<string>('')

    const [contracts, setContracts] = useState<Array<string>>(
        orgContracts || []
    )
    const [contractsNetworks, setContractsNetworks] = useState<
        Array<SupportedChainIds>
    >(orgNetworks || [])
    const [contractsError, setContractsError] = useState<string>('')

    const [domains, setDomains] = useState([
        ...(project?.allowed_origins || []),
    ])
    const [domainsError, setDomainsError] = useState<string>('')

    const [isSaving, setIsSaving] = useState(false)

    const toast = useToast()

    const isValidName = () => {
        if (nameUpdated === '') {
            setProjectNameError('Project name is required')
            return false
        } else {
            setProjectNameError('')
            return true
        }
    }

    const isValidContracts = () => {
        let error = false
        contracts.forEach((contract: string) => {
            if (!ethers.utils.isAddress(contract)) {
                setContractsError(
                    'Invalid contracts / At least one valid contract is required.'
                )
                error = true
            }
        })

        if (contractsNetworks.length === 0 || error) {
            setContractsError(
                'Invalid contracts / At least one valid contract is required.'
            )
            error = false
            return false
        } else {
            setContractsError('')
            return true
        }
    }

    const isValidDomains = () => {
        const error = domains.some((domain) => !isValidUrl(domain))
        if (error) {
            setDomainsError(
                'Invalid domains / At least one valid domain is required.'
            )
        } else {
            setDomainsError('')
            return true
        }
    }

    const handleSave = () => {
        if (!project) return
        const isValid = isValidName() && isValidContracts() && isValidDomains()
        if (!isValid) return

        if (!ownerAndWebHookAttributes) {
            toast({
                title: 'Error',
                description: 'Wallet not connected.',
                status: 'error',
                isClosable: true,
            })
            return
        }

        setIsSaving(true)

        updateProject(
            ownerAndWebHookAttributes,
            project,
            nameUpdated,
            contracts,
            contractsNetworks,
            domains
        ).then(() => {
            updateProjects().then(() => {
                toast({
                    title: 'Success',
                    description: 'Your changes are saved now.',
                    status: 'success',
                    isClosable: true,
                })
                setIsSaving(false)
            })
        })
    }

    if (!project) {
        return 'Not Found'
    }

    return (
        <Box p="5">
            <Flex mb="50" alignItems={'center'} justifyContent="center">
                <Text variant="heading1Bold" lineHeight="100%">
                    Edit Dapp
                </Text>
                <Button isLoading={isSaving} variant="primary2" ml="auto" onClick={handleSave}>
                    <Text variant={'heading3Bold'} color={'inherit'}>
                        Save
                    </Text>
                </Button>
            </Flex>
            <EditProjectCard
                nameUpdated={nameUpdated}
                setNameUpdated={(newVal) => setNameUpdated(newVal)}
                nameUpdatedError={projectNameError}
                contracts={contracts}
                setContracts={(newVal) => setContracts(newVal)}
                contractsNetworks={contractsNetworks}
                setContractsNetworks={(newVal) => setContractsNetworks(newVal)}
                contractsError={contractsError}
                domains={domains}
                setDomains={(newValue) => setDomains(newValue)}
                domainsError={domainsError}
            />
        </Box>
    )
}
