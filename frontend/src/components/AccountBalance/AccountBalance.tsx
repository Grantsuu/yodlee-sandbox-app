import React, { useState } from 'react'
import { CodeBlock } from '../CodeBlock/CodeBlock'
import { getAccountBalance } from '../../api/YodleeSandboxAPI'
import BackToTop from '../BackToTop/BackToTop'

interface AccountBalanceProps {
    providerAccountId: string
}

const AccountBalance = ({ providerAccountId }: AccountBalanceProps) => {

    const [accountBalance, setAccountBalance] = useState("")

    const onSubmit = () => {
        getAccountBalance(providerAccountId)
            .then(data => {
                console.log(data)
                setAccountBalance(JSON.stringify(data["account"], null, 2))
            })
    }

    return (
        <div className="container-fluid mb-3 text-secondary">
            <h4 className="text-light">5. Get Account Balance</h4>
            <ol>
                <li>
                    With the provider account ID you received in step 3 entered above, click the "Submit Request" button to get account balance data.
                </li>
            </ol>
            <button
                type="submit"
                className="btn btn-primary mt-2 mb-3"
                onClick={onSubmit}>
                Submit Request
            </button>
            {accountBalance &&
                <div>
                    <CodeBlock
                        title="Account Balance"
                        code={accountBalance}
                    />
                    <BackToTop />
                </div>
            }
        </div>
    )
}

export default AccountBalance