import React, { useState } from 'react'

interface FastLinkCodePenProps {
    providerAccountId: string
    setProviderAccountId: any
    setStep: any
}

const FastLinkCodePen = ({ providerAccountId, setProviderAccountId, setStep }: FastLinkCodePenProps) => {

    const [inputs, setInputs] = useState({
        providerAccountId: providerAccountId
    })

    const inputsHandler = (e: any) => {
        const { name, value } = e.target;
        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const onNextStep = () => {
        setProviderAccountId(inputs["providerAccountId"])
        setStep(4)        
    }
    return (
        <div className="container-fluid mb-3 text-secondary">
            <h4 className="text-light">3. Obtain <code>providerAccountId</code> from CodePen</h4>
            <ol>
                <li>
                    Navigate to the CodePen website <a target="_blank" rel="noreferrer" href="https://codepen.io/team/yodlee-dev-ex/pen/JjLXMrv">here</a>.
                </li>
                <li>
                    Scroll down to the bottom of page and enter in the <code>accessToken</code> you generated in the previous step.
                </li>
                <li>
                    Click the "Link an Account" button and then select the "Dag Site" from the list of providers.
                    <p className="fw-lighter">Note: If "Dag Site" does not appear initially in the list you may have to search for it.</p>
                </li>
                <li>
                    Sign in to the "Dag Site" provider using the credentials provided earlier on the CodePen page.
                </li>
                <li>
                    The <code>providerAccountId</code> should now be generated in the "Link Results" right above the "Link an Account" section. Enter the value provided below.
                </li>
            </ol>
            {/* Provider Account ID Field */}
            <label htmlFor="clientId" className="form-label text-light mb-0">Provider Account ID</label>
            <input
                type="text"
                name="providerAccountId"
                id="providerAccountId"
                onChange={inputsHandler}
                value={inputs.providerAccountId}
                className="form-control form-control-sm" />
            <button
                type="submit"
                className="btn btn-primary my-3"
                onClick={onNextStep}>
                Next Step
            </button>
        </div>
    )
}

export default FastLinkCodePen