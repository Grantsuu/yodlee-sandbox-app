import React from 'react'

const BackToTop = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour 
               in place of 'smooth' */
        });
    };

    return (
        <button
            type="submit"
            className="btn btn-primary my-3"
            onClick={scrollToTop}>
            Back to Top
        </button>
    )
}

export default BackToTop