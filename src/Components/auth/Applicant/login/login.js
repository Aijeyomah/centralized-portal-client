import React, { useState } from 'react';
import logo from '../../../../Images/logo.png';
import './login.css';
import Input, { PasswordInput } from '../../../../Components/Input/Input';
import { Link, withRouter } from 'react-router-dom';
import { FormButton } from '../../../../Components/Button/Button';
import axios from 'axios'
import { motion } from 'framer-motion'
import useSpinner from './../../../../Spinner/useSpinner';

const Login = (props) => {
    const [spinner, showSpinner, hideSpinner] = useSpinner()
    const [errorMessage, setErrorMessage] = useState({ error: '' })

    const initialstate = {
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
    };
    const [state, setState] = useState(initialstate);
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const handleSpinner = () => {
        showSpinner()
    }


    const canBeSubmitted = () => {
        return (state.email && state.password);
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
            password: "",
            emailError: "",
            passwordError: "",
        })

        const validate = () => {
            let emailError = "";
            let passwordError = "";
            const validEmailRegex =
                RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
            if (!state.email) {
                emailError = 'Email field cannot be empty';
            } else if (!validEmailRegex.test(state.email)) {
                emailError = 'Email is invalid';
            }

            if (!state.password) {
                passwordError = 'Password field cannot be empty';
            } else if (state.password.length < 8) {
                passwordError = 'Password must be a minimum of 8 digits';
            }

            if (emailError || passwordError) {
                setState({
                    ...state,
                    emailError, passwordError
                })
                return false
            }
            return true
        }
        const isValid = validate();
        if (isValid) {
            setState(initialstate)
            const logindetails = {
                email_address: state.email,
                password: state.password
            }
            let config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            axios.post('/api/v1/auth/signin', logindetails, config)
                .then(res => {
                    localStorage.setItem('token', res.data.data.token)
                    console.log(res)
                    hideSpinner()
                    props.history.push('/applicantdashboard')
                }).catch(err => {
                    setErrorMessage({ error: err.response.data.message })
                    hideSpinner()
                })
        }
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
                    <p className='brandText'>Applicant Log In</p>
                </div>
                <form className='loginForm' onSubmit={handleSubmit} noValidate>
                    <Input type='email' name='email' value={state.email} handleChange={handleChange} errorMsg={state.emailError} />
                    <PasswordInput name='password' value={state.password} handleChange={handleChange} errorMsg={state.passwordError} />
                    <p style={{ display: !errorMessage.error ? "none" : "block", color: "red", textAlign: "center", margin: 0 }} >{errorMessage.error}</p>
                    <FormButton onclick={handleSpinner} disabled={!isEnabled} text='Sign In' />
                    <div className='loginText'>
                        <p className='formText'>Don’t have an account yet? <Link to='/signup'>Sign Up</Link></p>
                        <p className='formText'><Link to='/forgotPassword'>Forgot Password?</Link></p>
                    </div>
                </form>
            </motion.div>
            {spinner}
        </div>
    );
}
export default withRouter(Login);