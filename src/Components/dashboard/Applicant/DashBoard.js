import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SideBar from './SideBar';
import './DashBoard.css'
import { Switch, Route } from 'react-router-dom'
import Assessment from './Assessment';
import DashBoardHome from './DashBoardHome';
import Logout from './Logout'
import useSpinner from './../../../Spinner/useSpinner';
import { motion } from 'framer-motion'


const Dashboard = (props) => {
    const [spinner, showSpinner, hideSpinner] = useSpinner()
    const [userDetail, setUserDetail] = useState({ first_name: '', last_name: '', email_address: '', is_admin: '' })

    useEffect(() => {
        showSpinner()
    }, [])

    useEffect(() => {
        if (userDetail.first_name !== "") {
            hideSpinner()
        }
    })



    useEffect(() => {
        const token = localStorage.getItem('token')
        let config = {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }
        axios.get("/api/v1/getuserDetail", config)
            .then(res => {
                setUserDetail({
                    first_name: res.data.data.first_name,
                    last_name: res.data.data.last_name,
                    email_address: res.data.data.email_address,
                    is_admin: res.data.data.is_admin
                })
            }).catch(err => {
                console.log(err.response.data.message)
                props.history.push('/login')
            })
        if (!token) {
            props.history.push('/login')
        }
    }, [])

    return (
        <div>
            <motion.div initial={{ y: -350 }} animate={{ y: 0 }} transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 170 }}
                className="_container">
                <SideBar first_name={userDetail.first_name} last_name={userDetail.last_name} email_address={userDetail.email_address} />
                <Switch>
                    <Route exact path="/applicantdashboard/assessment" component={Assessment} />
                    <Route exact path="/applicantdashboard" component={DashBoardHome} />
                    <Route exact path="/applicantdashboard/logout" component={Logout} />
                </Switch>
                <motion.div className="welcome" initial={{ y: 0, opacity: 1 }} animate={{ x: 1000 }} transition={{ duration: 2, delay: 7 }} >
                    Welcome to the Dashboard, {userDetail.first_name}
                </motion.div>
            </motion.div>
            {spinner}
        </div>
    )
}

export default Dashboard