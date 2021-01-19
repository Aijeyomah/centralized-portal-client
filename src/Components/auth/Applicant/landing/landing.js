import React from 'react';
import landingImg from '../../../../Images/landing-img.svg';
import './landing.css'
import logo from '../../../../Images/logo.png'
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div className='containerBody'>
            <div className='landingHeader'>
                <img className='headerLogo' src={logo} alt='logo' />
                <h2 className='headerText'>enyata</h2>
            </div>
            <div className='landingSection'>
                <div className='textSection'>
                    <h2>Get Your <br />Dream Job</h2>
                    <div className='landingButtons'>
                        <Link to='/signup' ><button className='landingButton'>Sign Up</button></Link>
                        <Link to='/login' ><button className='landingButton'>Sign In</button> </Link>
                    </div>

                </div>
                <div className='imageSection'>
                    <img src={landingImg} alt='image_icon' />
                </div>
            </div>

        </div>
    );
}