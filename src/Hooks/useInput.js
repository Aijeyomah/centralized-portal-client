import { useState } from 'react';
import axios from 'axios'


const initialstate = {
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
};

const useInput = (props) => {
    const [state, setState] = useState(initialstate);
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

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
                    props.history.push('/applicantdashboard')
                }).catch(err => {
                    console.log(err)
                })
        }

    }

    const isEnabled = canBeSubmitted();
    return [state, handleChange, handleSubmit, isEnabled];
}

export default useInput;