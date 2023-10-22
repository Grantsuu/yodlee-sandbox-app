import React, { useState } from 'react'
import { CodeBlock } from '../CodeBlock/CodeBlock'
import { getAccountInformation } from '../../api/YodleeSandboxAPI'
import BackToTop from '../BackToTop/BackToTop'

interface AccountInformationProps {
    providerAccountId: string
}

const AccountInformation = ({ providerAccountId }: AccountInformationProps) => {

    const [accountInformation, setAccountInformation] = useState("")

    const onSubmit = () => {
        getAccountInformation(providerAccountId)
            .then(data => {
                console.log(data)
                setAccountInformation(JSON.stringify(data["verifiedAccount"], null, 2))
            })
    }

    return (
        <div className="container-fluid mb-3 text-secondary">
            <h4 className="text-light">4. Get Linked Account Information</h4>
            <ol>
                <li>
                    With the provider account ID you received in the previous step entered above, click the "Submit Request" button to receive the now linked account information.
                </li>
            </ol>
            <button
                type="submit"
                className="btn btn-primary mt-2 mb-3"
                onClick={onSubmit}>
                Submit Request
            </button>
            {accountInformation &&
                <div>
                    <CodeBlock
                        title="Verified Account Information"
                        code={accountInformation}
                    />
                    <BackToTop />
                </div>
            }
        </div>
    )
}

export default AccountInformation