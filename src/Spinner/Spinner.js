import React from 'react'
import SpinnerIcon from './SpinnerIcon';
import './Spinner.css'

const Spinner = (props) => {
    return (
        <div className="spin" >
            <div className="spinner">
                <SpinnerIcon />
            </div>
        </div>
    )
}

export default Spinner
