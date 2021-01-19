import React, { useState } from 'react';
import './ApplicantSignUp.css'
import enyataLogo from '../../../../Images/enyata-logo.svg'
import eye from '../../../../Images/eye.svg'
import eyeSlashed from '../../../../Images/eye-slashed.svg'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import useSpinner from './../../../../Spinner/useSpinner';

const ApplicantSignUp = (props) => {
    const [spinner, showSpinner, hideSpinner] = useSpinner()

    const [state, setState] = useState({
        isPasswordShown: false,
        isConfirmPasswordShown: false
    })

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email_address: "",
        phone_number: "",
        password: "",
        confirm_password: "",
        errorMessage: ""
    })

    const handleInputChange = e => {
        setUser({
            ...user, [e.target.id]: e.target.value
        })
    }

    const togglePassword = () => {
        const { isPasswordShown } = state
        setState({
            isPasswordShown: !isPasswordShown
        })
    }

    const toggleConfirmPassword = () => {
        const { isConfirmPasswordShown } = state
        setState({
            isConfirmPasswordShown: !isConfirmPasswordShown
        })
    }

    const handleSpinner = () => {
        const { first_name, last_name, email_address, phone_number, password, confirm_password } = user
        if (!first_name || !last_name || !email_address || !phone_number || !password || !confirm_password) {
            hideSpinner()
        } else {
            showSpinner()
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { first_name, last_name, email_address, phone_number, password, confirm_password } = user
        let userDetails = { first_name, last_name, email_address, phone_number, password, confirm_password }
        setUser({
            ...user, first_name: "", last_name: "", email_address: "", phone_number: "", password: "", confirm_password: "",
        })
        console.log(userDetails)
        let config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        axios.post('/api/v1/auth/signup', userDetails, config)
            .then(res => {
                localStorage.setItem('token', res.data.data.token)
                console.log(res)
                hideSpinner()
                props.history.push('/login')
                console.log(res.status.message)
            }).catch(err => {
                setUser({
                    errorMessage: err.response.data.message
                })
                hideSpinner()
            })
    }

    return (
        <div>
            <motion.form initial={{ x: "-100vw" }} animate={{ x: 0 }} transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 170 }}
                className="signup_wrapper" onSubmit={handleSubmit}>
                <div className="enyata-logo">
                    <img src={enyataLogo} alt="Enyata logo" />
                </div>
                <p className="applicant">Applicant Sign Up</p>
                <div className="first-row">
                    <div>
                        <label>First name</label>
                        <br />
                        <input value={user.first_name} id="first_name" type="text" onChange={handleInputChange} required /><br />
                    </div>
                    <div>
                        <label>Last name</label>
                        <br />
                        <input value={user.last_name} id="last_name" type="text" onChange={handleInputChange} required /><br />
                    </div>
                </div>
                <div className="second-row">
                    <div>
                        <label>Email Address</label>
                        <br />
                        <input value={user.email_address} id="email_address" type="email"
                            pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
                            onChange={handleInputChange} required /><br />
                    </div>
                    <div>
                        <label>Phone Number</label>
                        <br />
                        <input value={user.phone_number} id="phone_number" type="tel" onChange={handleInputChange} required /><br />
                    </div>
                </div>
                <div className="third-row">
                    <div>
                        <label>Password</label>
                        <br />
                        <input value={user.password} id="password" type={(state.isPasswordShown) ? "text" : "password"} onChange={handleInputChange} required /><br />
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <br />
                        <input value={user.confirm_password} id="confirm_password" type={(state.isConfirmPasswordShown) ? "text" : "password"} onChange={handleInputChange} required /><br />
                    </div>
                    <div className="eye-icon">
                        <img onClick={togglePassword} src={(state.isPasswordShown) ? eyeSlashed : eye} alt="eye" />
                    </div>
                    <div className="second-eye">
                        <img onClick={toggleConfirmPassword} src={(state.isConfirmPasswordShown) ? eyeSlashed : eye} alt="eye" />
                    </div>
                </div>
                <p className="red" style={{ color: "red" }} >{user.errorMessage}</p>
                <motion.button whileHover={{ scale: 1.1 }} onClick={handleSpinner} type="submit">Sign Up</motion.button>
                <p className="sign-in-link">Already have an account? <span ><Link to="/login">Sign in</Link></span></p>
            </motion.form>
            {spinner}
        </div>
    )
}

export default withRouter(ApplicantSignUp)