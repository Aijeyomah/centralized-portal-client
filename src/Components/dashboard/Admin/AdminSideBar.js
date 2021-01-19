import React, { useState, useEffect } from 'react'
import './AdminSideBar.css'
import dashIcon from '../../../Images/dashboard-icon.svg'
import appEntriesIcon from '../../../Images/app-entries.svg'
import createAppIcon from '../../../Images/create-app.svg'
import composeAssessIcon from '../../../Images/compose-assessment.svg'
import assessHistoryIcon from '../../../Images/assess-history.svg'
import results from '../../../Images/results.svg'
import Navigation from './../Applicant/Navigation';
import logoutIcon from '../../../Images/logout-icon.svg'
import avatar from '../../../Images/avatar.svg'
import { withRouter } from 'react-router-dom'
import Modal from './../Applicant/modal';
import axios from 'axios'
import { motion } from 'framer-motion'

const AdminSideBar = (props) => {
    const [state, setState] = useState({ show: false })
    const [adminPic, setAdminPic] = useState()
    const showModal = () => {
        setState({ show: true });
    };

    const hideModal = () => {
        setState({ show: false });
    };

    const handleLogOut = (e) => {
        e.preventDefault()
        localStorage.removeItem('token')
        props.history.push('/admin/login')
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        }
        axios.get("/api/v1/getadmindetail", config)
            .then((res) => {
                setAdminPic(res.data.data.pictures)
                console.log(res)
            }).catch((err) => {
                console.log(err.response.data.message)
            })
    }, [])

    let adminImage = `https://agile-cove-05072.herokuapp.com/upload_profile/${adminPic}`

    return (
        <div className="sidebar">
            <div className="sidebar-head">
                <div className="sidebar-wrapper">
                    <motion.img
                        transition={{ type: "spring" }}
                        whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgb(181, 210, 49)" }}
                        onClick={showModal} src={!adminPic ? avatar : adminImage} alt="avatar" />
                </div>
                <p className="admin_name">{props.first_name} {props.last_name}</p>
                <p className="admin_email">{props.email_address} </p>
            </div>
            <div className="sidebar-links">
                <Navigation url="/admindashboard" src={dashIcon} text="Dashboard" className="link-inactive" activeClassName="link-active" />
                <Navigation url="/admindashboard/createapplication" src={createAppIcon} text="Create Application" className="link-inactive" activeClassName="link-active" />
                <Navigation url="/admindashboard/entries" src={appEntriesIcon} text="Application Entries" className="link-inactive" activeClassName="link-active" />
                <Navigation url="/admindashboard/assessment" src={composeAssessIcon} text="Compose Assessment" className="link-inactive" activeClassName="link-active" />
                <Navigation url="/admindashboard/history" src={assessHistoryIcon} text="Assessment History" className="link-inactive" activeClassName="link-active" />
                <Navigation url="/admindashboard/results" src={results} text="Results" className="link-inactive" activeClassName="link-active" />
            </div>
            <Navigation whileHover={{ scale: 1.1, color: '#006df0', originX: 0, type: "spring" }}
                clicked={handleLogOut} url="/admindashboard/logout" src={logoutIcon} text="Logout" className="logout-inactive" activeClassName="logout-active" />
            <Modal show={state.show} handleClose={hideModal} />
        </div>
    )
}

export default withRouter(AdminSideBar)