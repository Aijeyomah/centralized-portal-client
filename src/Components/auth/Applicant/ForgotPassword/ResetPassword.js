import React, { useState } from 'react';
import logo from '../../../../Images/logo.png';
import './ForgotPassword.css';
import axios from 'axios'
import { motion } from 'framer-motion'
import useSpinner from './../../../../Spinner/useSpinner';

export default (props) => {
    const [spinner, showSpinner, hideSpinner] = useSpinner()
    const [state, setState] = useState({
        password: "",
        confirm_password: "",
        token: "",
        errorMessage: ""
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const { password, confirm_password, token } = state
        const resetDetails = { password, confirm_password, token }
        axios.post('/api/v1/auth/setnewpassword', resetDetails)
            .then((res) => {
                console.log(res)
                hideSpinner()
                props.history.push('/login')
            }).catch((err) => {
                console.log(err.response.data.message)
                setState({
                    errorMessage: err.response.data.message
                })
                hideSpinner()
            })
    }

    return (
        <div>
            <motion.div initial={{ x: "-100vw" }} animate={{ x: 0 }} transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 170 }}
                className='container'>
                <div className='logoDiv'>
                    <img src={logo} className="logo" alt="logo" />
                </div>
                <div className='tagline'>
                    <h2 className='brandName'>enyata</h2>
                    <p className='brandText'>Reset Password</p>
                </div>
                <p className='passwordResetText'> Input a new password</p>
                <form className='forgotPasswordForm' onSubmit={handleSubmit} noValidate>
                    <label><strong>Password</strong></label>
                    <input type="password" id="password" onChange={handleChange} required />
                    <label><strong>Confirm Password</strong></label>
                    <input type="password" id="confirm_password" onChange={handleChange} required />
                    <label><strong>Token</strong></label>
                    <input type="text" id="token" onChange={handleChange} required />
                    <p className="reset_err_msg" style={{ display: state.errorMessage ? "block" : "none", color: "red", margin: "0 auto" }} >{state.errorMessage}</p>
                    <motion.button whileHover={{ scale: 1.1 }} onClick={() => showSpinner()} className="reset_btn">Submit</motion.button>
                </form>
            </motion.div>
            {spinner}
        </div>
    );
} 