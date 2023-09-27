import React from 'react';

function App() {
    return (
        <div className="container-fluid">
            <h1 className="text-light">Yodlee Sandbox Browser</h1>
            <p className="text-secondary">
                This website demonstrates the Envestment Yodlee developer quickstart experience using the browser instead of Postman.
                To get started, follow the steps as listed below.
            </p>
            <h4 className="text-light">1. Select a flow</h4>
            <div className="container-fluid text-center">
                <div className="row row-cols-auto">
                    <div className="col">
                        <button type="button" className="btn btn-primary">Verify Account</button>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-primary">Verify Balances</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
