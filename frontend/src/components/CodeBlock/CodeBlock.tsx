import React, { useState, useEffect } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

interface CodeBlockProps {
    title: string
    code: string
}

export const CodeBlock = ({ title, code }: CodeBlockProps) => {

    const [loading, setLoading] = useState(true)
    const [copyIcon, setCopyIcon] = useState(<i className="fa-regular fa-clone"></i>)

    const handleCopyButton = () => {
        setCopyIcon(<i className="fa-solid fa-check"></i>)
        setTimeout(() => setCopyIcon(<i className="fa-regular fa-clone"></i>), 700)
        navigator.clipboard.writeText(code);
    }

    const tooltip = (
        <Tooltip id="tooltip">
            Copied!
        </Tooltip>
    );

    useEffect(() => {
        if (code) {
            setLoading(false)
        }
    }, [code])

    return (
        <div className="card text-bg-dark">
            <div className="card-header m-0" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="font-monospace">{title}</div>
                <OverlayTrigger placement="top" trigger="focus" overlay={tooltip}>
                    <button type="button" className="btn btn-outline-light" onClick={handleCopyButton}>
                        {copyIcon}
                    </button>
                </OverlayTrigger>
            </div>
            <div className="card-body py-2">
                {loading &&
                    <p className="placeholder-glow">
                        <span className="placeholder col-12"></span>
                    </p>
                }
                {!loading &&
                    <SyntaxHighlighter language="javascript" style={dracula} className="m-0 py-3">
                        {code}
                    </SyntaxHighlighter>
                }
            </div>
        </div>
    )
}
