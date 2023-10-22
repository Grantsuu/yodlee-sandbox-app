import React, { useState } from 'react';
import FlowSelector from './components/FlowSelector/FlowSelector';
import GenerateAuthToken from './components/GenerateAuthToken/GenerateAuthToken';
import FastLinkCodePen from './components/FastLinkCodePen/FastLinkCodePen';
import LinkedAccount from './components/LinkedAccount/LinkedAccount';

const App = () => {
    const [step, setStep] = useState(1);
    const [flow, setFlow] = useState(0);
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
                {/* Step 2 - Generate Authentication Token */}
                {step >= 2 && flow === 1 &&
                    <GenerateAuthToken setStep={setStep}/>
                }
                {step >= 2 && flow === 2 &&
                    <GenerateAuthToken setStep={setStep}/>
                }
                {/* Step 3 : Flow 1 - Fasklink */}
                {step >= 3 && flow === 1 &&
                    <FastLinkCodePen setStep={setStep}/>
                }
                {/* Step 4 : Flow 1 - Get Linked Account Information */}
                {step >= 4 && flow === 1 &&
                    <LinkedAccount />
                }
            </div>
        </div>
    );
}

export default App;
