import React, { useState } from 'react'
import { CodeBlock } from '../CodeBlock/CodeBlock'
import { putRefreshAccount } from '../../api/YodleeSandboxAPI'

interface RefreshAccountProps {
    providerAccountId: string
    setStep: any
}

const RefreshAccount = ({ providerAccountId, setStep }: RefreshAccountProps) => {
    const [accountRefresh, setAccountRefresh] = useState("")

    const onSubmit = () => {
        setStep(5)
        putRefreshAccount(providerAccountId)
            .then(data => {
                console.log(data)
                setAccountRefresh(JSON.stringify(data["providerAccount"], null, 2))
            })
    }

    return (
        <div className="container-fluid mb-3 text-secondary">
            <h4 className="text-light">4. Refresh Account Data</h4>
            <ol>
                <li>
                    With the provider account ID you received in the previous step entered above, click the "Submit Request" button to refresh account data.
                    <p className="fw-lighter">Note: You may receive no response back if you've already refreshed recently. If this happens, you may proceed with the rest of the steps in this flow.</p>
                </li>
            </ol>
            <button
                type="submit"
                className="btn btn-primary mt-2 mb-3"
                onClick={onSubmit}>
                Submit Request
            </button>
            {accountRefresh &&
                <CodeBlock
                    title="Refresh Account Response"
                    code={accountRefresh}
                />
            }
        </div>
    )
}

export default RefreshAccount