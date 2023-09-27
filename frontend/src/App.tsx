import React, { useState } from 'react';

function App() {
    const [flow, setFlow] = useState<number>(0);
    return (
        <div className="container-fluid">
            <h1 className="text-light">Yodlee Sandbox Browser</h1>
            <p className="text-secondary">
                This website demonstrates the Envestment Yodlee developer quickstart experience using the browser instead of Postman.
                To get started, follow the steps as listed below.
            </p>
            <h4 className="text-light">1. Select a flow</h4>
            <div className="container-fluid mb-3">
                <div className="btn-group" role="group" aria-label="Yodlee sandbox quickstart flow">
                    <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio1"
                        autoComplete="off"
                        onClick={() => setFlow(1)}
                    />
                    <label className="btn btn-outline-primary" htmlFor="btnradio1">Verify Account</label>
                    <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio2"
                        autoComplete="off"
                        onClick={() => setFlow(2)}
                    />
                    <label className="btn btn-outline-primary" htmlFor="btnradio2">Verify Balances</label>
                </div>
            </div>
            {/* Step 2 changes depending on the flow selected */}
            {flow === 1 &&
                <div>
                    <h4 className="text-light">2. Flow 1 Selected</h4>
                </div>
            }
            {flow === 2 &&
                <div>
                    <h4 className="text-light">2. Flow 2 Selected</h4>
                </div>
            }
        </div>
    );
}

export default App;
