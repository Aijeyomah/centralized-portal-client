import React from 'react'

function Timer(props) {
    return (
        <div className="timer-section">
            <p className="timer-text">Timer</p>
            <div className="timer-count">
                <p className="timer-count-mins">{props.updatedM >= 10 ? props.updatedM : "0" + props.updatedM}</p>
                <p className="timer-count-sec">{props.updatedS >= 10 ? props.updatedS : "0" + props.updatedS}</p>
            </div>
            <p className="minutes">mins</p>
            <p className="sec">sec</p>
        </div>
    )
}

export default Timer
