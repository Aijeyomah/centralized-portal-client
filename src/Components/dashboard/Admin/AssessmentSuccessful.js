import React from 'react'
import AssessmentSuccessIcon from '../../../Images/assessment-successful.svg'
import './AssessmentSuccessful.css'
import { Link } from 'react-router-dom'

const AssessmentSuccessful = (props) => {
    return (
        <div style={{ display: props.nextQuestion > 31 ? "block" : "none" }} >
            <div className="assess-success">
                <img src={AssessmentSuccessIcon} alt="asssessment successful" />
            </div>
            <div className="congrats">
                <h4>Congratulations, your assessment has been created successfully!</h4>
                <Link to="/admindashboard/history"><button>Go to Assessment History</button></Link>
            </div>
        </div>
    )
}

export default AssessmentSuccessful
