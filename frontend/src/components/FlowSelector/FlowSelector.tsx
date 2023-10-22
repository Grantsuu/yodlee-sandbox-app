import React from 'react';

interface FlowSelectorProps {
    setStep: any;
    setFlow: any;
}

const FlowSelector = ({ setStep, setFlow }: FlowSelectorProps) => {

    const handleFlowButton = (flow: number) => {
        setStep(2)
        setFlow(flow)
    }
    return (
        <div className="container-fluid my-3">
            <h4 className="text-light">1. Select a flow</h4>
            <div className="btn-group" role="group" aria-label="Yodlee sandbox quickstart flow">
                <input
                    type="radio"
                    className="btn-check"
                    name="btnradio"
                    id="btnradio1"
                    autoComplete="off"
                    onClick={() => handleFlowButton(1)}
                />
                <label className="btn btn-outline-primary" htmlFor="btnradio1">Verify Account</label>
                <input
                    type="radio"
                    className="btn-check"
                    name="btnradio"
                    id="btnradio2"
                    autoComplete="off"
                    onClick={() => handleFlowButton(2)}
                />
                <label className="btn btn-outline-primary" htmlFor="btnradio2">Verify Balances</label>
            </div>
        </div>
    )
}

export default FlowSelector