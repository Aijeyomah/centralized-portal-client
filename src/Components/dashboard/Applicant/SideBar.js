import React, { useState, useEffect } from 'react'
import './SideBar.css'
import dashIcon from '../../../Images/dashboard-icon.svg'
import assessIcon from '../../../Images/assessment-icon.svg'
import Navigation from './Navigation';
import logoutIcon from '../../../Images/logout-icon.svg'
import avatar from '../../../Images/avatar.svg'
import Modal from './modal'
import { withRouter } from 'react-router-dom'
import useSpinner from './../../../Spinner/useSpinner';
import axios from 'axios'
import { motion } from 'framer-motion'

const SideBar = (props) => {
    const [spinner, showSpinner] = useSpinner()
    const [state, setState] = useState({ show: false })
    const [userPic, getUserPic] = useState()
    const showModal = () => {
        setState({ show: true });
    };

    const hideModal = () => {
        setState({ show: false });
    };

     

    const removeToken = async () => {
        const token = localStorage.getItem('token')
        console.log(token)
        let config = {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }
        axios.put("/api/v1/auth/logOut", config)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err.response)
            })
    }

    const handleLogOut = async (e) => {
        e.preventDefault()
        await removeToken()
        localStorage.removeItem('token')
        props.history.push('/login')
    }

    const loadSpinner = () => {
        showSpinner()
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        }
        axios.get("/api/v1/getuserDetail", config)
            .then((res) => {
                console.log(res.data.data.pictures)
                getUserPic(res.data.data.pictures)
            }).catch((err) => {
                console.log(err.response.data.message)
            })
    }, [])

    let userImage = `https://agile-cove-05072.herokuapp.com/upload_profile/${userPic}`

    return (
        <div className="sidebar">
            <div className="sidebar_head">
                <div className="sidebar_wrapper">
                    <motion.img
                        transition={{ type: "spring" }}
                        whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgb(181, 210, 49)" }}
                        src={!userPic ? avatar : userImage} onClick={showModal} alt="avatar" />
                </div>

                <p className="applicant_name">{props.first_name} {props.last_name}</p>
                <p className="applicant_email">{props.email_address}</p>

            </div>
            <Modal show={state.show} handleClose={hideModal} />
            <div className="sidebar-links">
                <Navigation url="/applicantdashboard" src={dashIcon} text="Dashboard" className="dash-inactive" activeClassName="dash-active" />
                <Navigation url="/applicantdashboard/assessment" src={assessIcon} text="Assessment" className="assess-inactive" activeClassName="assess-active" />
            </div>
            <Navigation whileHover={{
                scale: 1.1, color: '#1e3f61', originX: 0, type: "spring"
            }}
                clicked={handleLogOut} url="/applicantdashboard/logout" src={logoutIcon} text="Logout" className="logout-inactive" activeClassName="logout-active" />
            {spinner}
        </div>
    )
}

export default withRouter(SideBar)