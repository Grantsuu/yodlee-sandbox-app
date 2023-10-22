import React from 'react'

interface FastLinkCodePenProps {
    setStep: any
}

const FastLinkCodePen = ({ setStep }: FastLinkCodePenProps) => {
    return (
        <div className="container-fluid mb-3 text-secondary">
            <h4 className="text-light">3. Obtain <code>providerAccountId</code> from CodePen</h4>
            <ol>
                <li>
                    Navigate to the CodePen website <a href="https://codepen.io/team/yodlee-dev-ex/pen/JjLXMrv">here</a>.
                </li>
                <li>
                    Scroll down to the bottom of page and enter in the <code>authenticationToken</code> you generated in the previous step.
                </li>
                <li>
                    Click the "Link an Account" button and then select the "Dag Site" from the list of providers.
                    <p className="fw-lighter">Note: If "Dag Site" does not appear initially in the list you may have to search for it.</p>
                </li>
                <li>
                    Sign in to the "Dag Site" provider using the credentials provided earlier on the CodePen page.
                </li>
                <li>
                    The <code>providerAccountId</code> should now be generated in the "Link Results" right above the "Link an Account" section. Be sure to record this value for future usage.
                </li>
            </ol>
        </div>
    )
}

export default FastLinkCodePen