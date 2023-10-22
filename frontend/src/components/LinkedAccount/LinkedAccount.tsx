import React, { useState } from 'react'
import { CodeBlock } from '../CodeBlock/CodeBlock'
import { getAccountInformation } from '../../api/YodleeSandboxAPI'

interface LinkedAccountProps {

}

const LinkedAccount = ({ }: LinkedAccountProps) => {

    const [inputs, setInputs] = useState({
        providerAccountId: ""
    })

    const [accountInformation, setAccountInformation] = useState("")

    const inputsHandler = (e: any) => {
        const { name, value } = e.target;
        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const onSubmit = () => {
        getAccountInformation(inputs["providerAccountId"])
            .then(data => {
                console.log(data)
                setAccountInformation(JSON.stringify(data["verifiedAccount"], null, 2))
            })
    }

    return (
        <div className="container-fluid mb-3 text-secondary">
            <h4 className="text-light">4. Get Linked Account Information</h4>
            {/* Provider Account ID Field */}
            <label htmlFor="clientId" className="form-label text-light mb-0">Provider Account ID</label>
            <input
                type="text"
                name="providerAccountId"
                id="providerAccountId"
                onChange={inputsHandler}
                value={inputs.providerAccountId}
                className="form-control form-control-sm mb-1" />
            <button
                type="submit"
                className="btn btn-primary my-2"
                onClick={onSubmit}>
                Submit
            </button>
            {accountInformation &&
                <CodeBlock
                    title="Verified Account Information"
                    code={accountInformation}
                />
            }
        </div>
    )
}

export default LinkedAccount