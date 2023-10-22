import React, { useState, useEffect } from 'react';
import FlowSelector from './components/FlowSelector/FlowSelector';
import GenerateAccessToken from './components/GenerateAccessToken/GenerateAccessToken';
import FastLinkCodePen from './components/FastLinkCodePen/FastLinkCodePen';
import AccountInformation from './components/AccountInformation/AccountInformation';
import RefreshAccount from './components/RefreshAccount/RefreshAccount'
import AccountBalance from './components/AccountBalance/AccountBalance'

const App = () => {
    const [step, setStep] = useState(1);
    const [flow, setFlow] = useState(0);
    const [accessToken, setAccessToken] = useState("")
    const [providerAccountId, setProviderAccountId] = useState("")

    useEffect(() => {
        // If we're on step 2 and already have an access token we can continue to step 3
        if (step === 2 && accessToken) {
            setStep(3)
        }
    })

    return (
        <div className="container-fluid">
            {/* Home page header */}
            <div className="container text-center">
                <h1 className="text-light">Yodlee Quickstart in Browser</h1>
                <p className="fs-5 text-secondary">
                    This website demonstrates the Envestment Yodlee developer quickstart experience using the browser instead of Postman.
                    <br></br>To get started, follow the steps as listed below.
                    <div className="fs-6 text-secondary">
                        (The original Postman guide can be found <a target="_blank" href="https://av.developer.yodlee.com/#cd52ebe4-1613-4695-b621-a4f9081251db">here</a>.)
                    </div>
                </p>
            </div>
            {/* Quickstart steps */}
            <div className="container w-50">
                {/* Step 1 - Select Flow */}
                {step >= 1 &&
                    <FlowSelector setStep={setStep} setFlow={setFlow} />
                }
                {/* Step 2 - Generate Access Token */}
                {step >= 2 &&
                    <GenerateAccessToken accessToken={accessToken} setAccessToken={setAccessToken} setStep={setStep} />
                }
                {/* Step 3 - Fasklink */}
                {step >= 3 &&
                    <FastLinkCodePen providerAccountId={providerAccountId} setProviderAccountId={setProviderAccountId} setStep={setStep} />
                }
                {/* Step 4 : Flow 1 - Get Linked Account Information */}
                {step >= 4 && flow === 1 &&
                    <AccountInformation providerAccountId={providerAccountId} />
                }
                {/* Step 4: Flow 2 - Refresh Account Data */}
                {step >= 4 && flow === 2 &&
                    <RefreshAccount providerAccountId={providerAccountId} setStep={setStep} />
                }
                {/* Step 5: Flow 2 - Get Account Balance */}
                {step >= 5 && flow === 2 &&
                    <AccountBalance providerAccountId={providerAccountId} />
                }
            </div>
        </div>
    );
}

export default App;
