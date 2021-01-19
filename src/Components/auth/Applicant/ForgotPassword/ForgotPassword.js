import React, { useState } from 'react';
import logo from '../../../../Images/logo.png';
import './ForgotPassword.css';
import Input from '../../../../Components/Input/Input';
import { FormButton } from '../../../../Components/Button/Button';
import axios from 'axios'
import { motion } from 'framer-motion'
import useSpinner from './../../../../Spinner/useSpinner';

const initialstate = {
    email: "",
    emailError: "",
};
export default (props) => {
    const [spinner, showSpinner, hideSpinner] = useSpinner()
    const [state, setState] = useState(initialstate);
    const [email, setEmail] = useState({
        verification: ""
    })
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    const canBeSubmitted = () => {
        return (state.email);
    }

    const handleSpinner = () => {
        showSpinner()
    }

    const handleSubmit = (e) => {
        if (!canBeSubmitted()) {
            e.preventDefault();
            return;
        }
        e.preventDefault();
        setState({
            ...state,
            email: "",
            emailError: "",
        })
        const validate = () => {
            let emailError = "";
            const validEmailRegex =
                RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);

            if (!state.email) {
                emailError = 'Email field cannot be empty';
            } else if (!validEmailRegex.test(state.email)) {
                emailError = 'Email is invalid';
            }

            if (emailError) {
                setState({
                    ...state,
                    emailError
                })
                return false
            }
            return true
        }
        const isValid = validate();
        if (isValid) {
            setState(initialstate)
            const logindetails = {
                email_address: state.email
            }
            console.log(logindetails)
            let config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            axios.post("/api/v1/auth/forgotpassword", logindetails, config)
                .then((res) => {
                    console.log(res)
                    props.history.push('/resetpassword')
                    hideSpinner()
                }).catch(err => {
                    console.log(err.response.data.message)
                    setEmail({
                        verification: err.response.data.message
                    })
                    hideSpinner()
                })
        }
        // console.log(state)
    }
    const isEnabled = canBeSubmitted();

    return (
        <div>
            <motion.div initial={{ x: "-100vw" }} animate={{ x: 0 }} transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 170 }}
                className='container'>
                <div className='logoDiv'>
                    <img src={logo} className="logo" alt="logo" />
                </div>
                <div className='tagline'>
                    <h2 className='brandName'>enyata</h2>
                    <p className='brandText'>Forgot Password</p>
                </div>
                <p className='passwordResetText'> To reset your password, input your email below</p>
                <form className='forgotPasswordForm' onSubmit={handleSubmit} noValidate>
                    <Input type='email' name='email' value={state.email} handleChange={handleChange} errorMsg={state.emailError} />
                    <p className="email_catch_err" style={{ display: email.verification ? "block" : "none" }}>{email.verification}</p>
                    <FormButton onclick={handleSpinner} disabled={!isEnabled} text='Send Link' />
                </form>
            </motion.div>
            {spinner}
        </div>
    );
}