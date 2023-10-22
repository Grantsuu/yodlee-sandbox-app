import React, { useState } from 'react'
import { CodeBlock } from './CodeBlock/CodeBlock'
import { postUserToken, UserTokenResponse } from '../api/YodleeSandboxAPI'

interface GenerateAuthTokenProps {
    setStep: any
}

const GenerateAuthToken = ({ setStep }: GenerateAuthTokenProps) => {
    const [inputs, setInputs] = useState({
        clientId: '',
        secret: '',
        userName: ''
    })

    const [accessToken, setAccessToken] = useState("")

    const inputsHandler = (e: any) => {
        const { name, value } = e.target;
        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const onSubmit = () => {
        setStep(3)
        postUserToken({ clientId: inputs.clientId, secret: inputs.secret, userName: inputs.userName })
            .then(data => {
                console.log(data)
                setAccessToken((data as UserTokenResponse).token?.accessToken)
            })
    }

    return (
        <div className="container-fluid mb-3 text-secondary">
            <h4 className="text-light">2. Generate an Authentication Token</h4>
            <ol>
                <li>
                    Login to your <a target="_blank" href="https://developer.envestnet.com/user/login?type=ydl">Yodlee developer account</a> and navigate to the Dashboard.
                </li>
                <li>
                    Find and enter your <code>client_id</code>, <code>secret</code>, and <code>userName</code> below and click the "Submit" button to receive your authentication token.
                </li>
            </ol>
            {/* Client ID Field */}
            <label htmlFor="clientId" className="form-label text-light mb-0">ClientID</label>
            <input
                type="text"
                name="clientId"
                id="clientId"
                onChange={inputsHandler}
                value={inputs.clientId}
                className="form-control form-control-sm mb-1" />
            {/* Secret Fiels */}
            <label htmlFor="secret" className="form-label text-light mb-0">Secret</label>
            <input
                type="text"
                name="secret"
                id="secret"
                onChange={inputsHandler}
                value={inputs.secret}
                className="form-control form-control-sm mb-1" />
            {/* User Name Field */}
            <label htmlFor="userName" className="form-label text-light mb-0">User Name</label>
            <input
                type="text"
                name="userName"
                id="userName"
                onChange={inputsHandler}
                value={inputs.userName}
                className="form-control form-control-sm"
                aria-describedby="userNameHelpBlock" />
            <div id="userNameHelpBlock" className="form-text text-secondary mb-2">
                The user name can be found under the "Test User" section in the dashboard.
                </div>
            {/* Submit Button */}
            <button
                type="submit"
                className="btn btn-primary mb-3"
                onClick={onSubmit}>
                Submit
                </button>
            {accessToken &&
                <CodeBlock
                    title="Generated Access Token"
                    code={accessToken}
                />
            }
        </div>
    )
}

export default GenerateAuthToken