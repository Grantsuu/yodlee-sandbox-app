import React from 'react'

const GenerateAuthToken = () => {
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
                {/* User Name Field */}
                <label htmlFor="userName" className="form-label text-light mb-0">User Name</label>
                <input type="text" id="userName" className="form-control form-control-sm w-25" aria-describedby="userNameHelpBlock" />
                <div id="userNameHelpBlock" className="form-text text-secondary">
                    The user name can be found under the "Test User" section in the dashboard.
                        </div>
                {/* Client ID Field */}
                <label htmlFor="clientId" className="form-label text-light mb-0">ClientID</label>
                <input type="text" id="clientId" className="form-control form-control-sm w-25 mb-1" />
                {/* Secret Fiels */}
                <label htmlFor="secret" className="form-label text-light mb-0">Secret</label>
                <input type="text" id="secret" className="form-control form-control-sm w-25 mb-3" />
                {/* Submit Button */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </div>
    )
}

export default GenerateAuthToken