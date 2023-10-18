import React, { useState, useEffect } from 'react';
import FlowSelector from './components/FlowSelector/FlowSelector'
import GenerateAuthToken from './components/GenerateAuthToken';

const App = () => {

    const [flow, setFlow] = useState<number>(0);
    return (
        <div className="container-fluid">
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
            <div className="container w-50">
                {/* Step 1 - Select Flow */}
                <FlowSelector setFlow={setFlow} className="mb-3" />
                {/* Step 2 - Generate Authentication Token */}
                {flow === 1 &&
                    <GenerateAuthToken />
                }
                {flow === 2 &&
                    <GenerateAuthToken />
                }
            </div>
        </div>
    );
}

export default App;
