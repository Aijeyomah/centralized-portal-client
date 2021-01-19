import React from 'react';
import logo from '../../../../Images/logo.png';
import './login.css';
import Input, { PasswordInput } from '../../../../Components/Input/Input';
import { Link, Redirect } from 'react-router-dom';
import { FormButton } from '../../../../Components/Button/Button';
import useInput from '../../../../Hooks/useInput';

const Login = (props) => {
    const [state, handleChange, handleSubmit, isEnabled, isLoggedIn] = useInput();
    // const referer = props.location.state.referer || '/';

    // if (isLoggedIn) {
    // return <Redirect to={referer} />;
    // }

    return (
        <div className='container'>
            <div className='logoDiv'>
                <img src={logo} className="logo" alt="logo" />
            </div>
            <div className='tagline'>
                <h2 className='brandName'>enyata</h2>
                <p className='brandText'>Applicant Log In</p>
            </div>
            <form className='loginForm' onSubmit={handleSubmit} noValidate>
                <Input type='email' name='email' value={state.email} handleChange={handleChange}
                    errorMsg={state.emailError} />
                <PasswordInput name='password' value={state.password} handleChange={handleChange}
                    errorMsg={state.passwordError} />
                <FormButton disabled={!isEnabled} text='Sign In' />
                <div className='loginText'>
                    <p className='formText'>Don’t have an account yet? <Link to='/signup'>Sign Up</Link></p>
                    <p className='formText'><Link to='/forgotPassword'>Forgot Password?</Link></p>
                </div>
            </form>
        </div>
    );
}
export default Login;