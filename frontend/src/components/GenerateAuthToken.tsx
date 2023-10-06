import React, { useState } from 'react'
import { postUserToken, UserTokenResponse } from '../YodleeSandboxAPI'

const GenerateAuthToken = () => {
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
        postUserToken({ clientId: inputs.clientId, secret: inputs.secret, userName: inputs.userName })
            .then(data => {
                console.log(data)
                console.log((data as UserTokenResponse).token.accessToken)
                setAccessToken((data as UserTokenResponse).token.accessToken)
            })
    }
    return (
        <div>
            <h4 className="text-light">2. Generate an Authentication Token</h4>
            <div className="container-fluid mb-3 text-secondary">
                <p className="">
                    <ul>
                        <li>
                            Login to your <a target="_blank" href="https://developer.envestnet.com/user/login?type=ydl">Yodlee developer account</a> and navigate to the Dashboard.
                        </li>
                        <li>
                            Find and enter your <code>client_id</code>, <code>secret</code>, and <code>userName</code> below and click the "Submit" button to receive your authentication token.
                        </li>
                    </ul>
                </p>
                {/* Client ID Field */}
                <label htmlFor="clientId" className="form-label text-light mb-0">ClientID</label>
                <input
                    type="text"
                    name="clientId"
                    id="clientId"
                    onChange={inputsHandler}
                    value={inputs.clientId}
                    className="form-control form-control-sm w-50 mb-1" />
                {/* Secret Fiels */}
                <label htmlFor="secret" className="form-label text-light mb-0">Secret</label>
                <input
                    type="text"
                    name="secret"
                    id="secret"
                    onChange={inputsHandler}
                    value={inputs.secret}
                    className="form-control form-control-sm w-50 mb-1" />
                {/* User Name Field */}
                <label htmlFor="userName" className="form-label text-light mb-0">User Name</label>
                <input
                    type="text"
                    name="userName"
                    id="userName"
                    onChange={inputsHandler}
                    value={inputs.userName}
                    className="form-control form-control-sm w-50"
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
                    <div className="card text-white bg-dark w-50 mb-3">
                        <div className="card-header">Access Token</div>
                        <div className="card-body">
                            <h5 className="card-title"><code>{accessToken}</code></h5>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default GenerateAuthToken