import React, { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { stackoverflowDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const CodeBlock = () => {

    const [copyIcon, setCopyIcon] = useState(<i className="fa-regular fa-clone"></i>)

    const handleCopyButton = () => {
        setCopyIcon(<i className="fa-solid fa-check"></i>)
        setTimeout(() => setCopyIcon(<i className="fa-regular fa-clone"></i>), 700)
        navigator.clipboard.writeText("Copied text???");
    }

    return (
        <div className="card text-bg-dark">
            <div className="card-header m-0" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                Header
                <button type="button" className="btn btn-outline-light" onClick={handleCopyButton}>
                    {copyIcon}
                </button>
            </div>
            <div className="card-body py-2">
                <SyntaxHighlighter language="javascript" style={stackoverflowDark} className="m-0 py-3">
                    "GCziUML7RPcWf9s9SlGQg9ipo0SR"
                </SyntaxHighlighter>
            </div>
        </div>
    )
}
