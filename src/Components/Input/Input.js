import React, { useState } from "react";
import "./input.css";
import eye from '../../Images/eye.svg';
import eye2 from '../../Images/eye2.svg';

export default ({ name, value, handleChange, type, errorMsg }) => {
  return (
    <div>
      <label>Email Address</label>
      <input
      className="input"
        type={type}
        name={name}
        value={value}
        onChange={handleChange}

      /> 
      <p className= 'errorMsg'>{errorMsg}</p>
    </div>
  );
};

export const PasswordInput = ({ name, value, handleChange, errorMsg}) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };

    return (
      <div className='passwordWrapper'>
        <label>Password</label>
        <input
          className="passwordInput"
          type={passwordShown ? "text" : "password"}
          name={name}
          value={value}
          onChange={handleChange}
          
        /> 
        <img className='eye' onClick={togglePasswordVisiblity} src={passwordShown ? eye2 : eye} alt='visibility_Icon'/>
        <p className= 'errorMsg'>{errorMsg}</p>
      </div>
    );
  };

