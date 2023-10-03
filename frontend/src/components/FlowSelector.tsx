import React from 'react';

interface FlowSelectorProps {
    setFlow: any;
    className?: string | undefined;
}

const FlowSelector = ({setFlow,className}:FlowSelectorProps) => {

    return (
        <div className={className}>
            <h4 className="text-light">1. Select a flow</h4>
            <div className="container-fluid mt-3">
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
        </div>
    )
}

export default FlowSelector