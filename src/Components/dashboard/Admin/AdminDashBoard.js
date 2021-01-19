import React, { useState, useEffect } from 'react'
import AdminSideBar from './AdminSideBar';
import './AdminDashBoard.css'
import { Switch, Route } from 'react-router-dom'
import AdminDashBoardHome from './AdminDashBoardHome';
import CreateApplication from './CreateApplication';
import ApplicationEntries from './ApplicationEntries';
import ComposeAssessment from './ComposeAssessment';
import AssessmentHistory from './AssessmentHistory';
import Results from './Results';
import AdminLogout from './AdminLogout';
import axios from 'axios'
import useSpinner from './../../../Spinner/useSpinner';
import { motion } from 'framer-motion'

const AdminDashboard = (props) => {
    const [spinner, showSpinner, hideSpinner] = useSpinner()

    useEffect(() => {
        showSpinner()
        return (() => {
            if (userDetail.first_name) {
                hideSpinner()
            }
        })
    })

    useEffect(() => {
        if (userDetail.first_name !== userDetail.last_name) {
            hideSpinner()
        }
    })

    const [userDetail, setUserDetail] = useState({ first_name: '', last_name: '', email_address: '', is_admin: '' })
    useEffect(() => {
        const token = localStorage.getItem('token')
        let config = {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }
        axios.get("/api/v1/getadmindetail", config)
            .then(res => {
                setUserDetail({
                    first_name: res.data.data.first_name,
                    last_name: res.data.data.last_name,
                    email_address: res.data.data.email_address,
                    is_admin: res.data.data.is_admin
                })
                console.log(res)
            }).catch(err => {
                console.log(err.message)
                props.history.push('/admin/login')
            })
    }, [])

    return (
        <div>
            <motion.div initial={{ y: -1650 }} animate={{ y: 0 }} transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 170 }}
                className="_container ">
                <AdminSideBar first_name={userDetail.first_name} last_name={userDetail.last_name} email_address={userDetail.email_address} />
                <Switch>
                    <Route exact path="/admindashboard" component={AdminDashBoardHome} />
                    <Route exact path="/admindashboard/createapplication" component={CreateApplication} />
                    <Route exact path="/admindashboard/entries" component={ApplicationEntries} />
                    <Route exact path="/admindashboard/assessment" component={ComposeAssessment} />
                    <Route exact path="/admindashboard/history" component={AssessmentHistory} />
                    <Route exact path="/admindashboard/results" component={Results} />
                    <Route exact path="/admindashboard/logout" component={AdminLogout} />
                </Switch>
            </motion.div>
            {spinner}
        </div>
    )
}

export default AdminDashboard