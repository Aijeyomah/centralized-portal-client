import React, { useEffect, useState } from 'react'
import Info from './AdminInfo';
import './AdminDashBoardHome.css'
import { AdminClientButton } from '../../Button/Button';
import axios from 'axios'

const DashBoardHome = (props) => {
    const [application, getApplications] = useState('')
    const [applications, getApplicationBatches] = useState('')
    const [applicationTable, setApplicationTable] = useState({
        appTable: [{}]
    })
    const [lastUpdate, getLastUpdate] = useState()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            props.history.push('/admin/login')
        }
        let config = {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }
        axios.get("api/v1/getApplication", config)
            .then(res => {
                getApplications(res.data.data.count)
            }).catch(err => {
                console.log(err)
            })
        axios.get("api/v1/getAllApplicationBatches", config)
            .then(res => {
                getApplicationBatches(res.data.data.count)
            }).catch(err => {
                console.log(err)
            })

        axios.get('/api/v1/getApplicationTable', config)
            .then(res => {
                console.log(res)
                setApplicationTable({
                    appTable: res.data.data
                })
            }).catch(error => {
                console.log(error)

            })
        axios.get('/api/v1/getlastapplicationupdate', config)
            .then(res => {
                console.log(res)
                getLastUpdate(res.data.data.updated_at)
            }).catch(error => {
                console.log(error)
            })
    }, [])

    const { appTable } = applicationTable
    const currentApp = appTable[appTable.length - 1].total
    const academy = appTable[appTable.length - 1].batch_id

    useEffect(() => {
        console.log(lastUpdate)
    })

    return (
        <div className='admin_dashboard_wrapper'>
            <div>
                <h2>Dashboard</h2>
            </div>
            <div className='admin_info_wrapper'>
                <div className='admin_info_container'>
                    <div>
                        <p className='normal'>Current Applications</p>
                        <p className='large'>{currentApp}</p>
                    </div>
                    <p className="admin_info_one">Academy {academy}.0</p>
                </div>
                <Info text="Total Applications" total_number={application} text2="All entries so far" className='admin_info_two' />
                <Info text="Academies" total_number={applications} text2="So far" className='admin_info_three' />
            </div>
            <div className='admin_dashboard_section2'>
                <div className='history'>
                    <h4>History</h4>
                    <p className='history_text'> <strong>Last Update:</strong> {lastUpdate}</p>
                    <table className='history_table'>
                        {
                            appTable.map((app, index) => (
                                <tr key={index}>
                                    <td className='history_batch'>Academy Batch {app.batch_id}</td>
                                    <td className='history_total'>{app.total} students</td>
                                    <td className='history_created_at'>Started {app.created_at}</td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
                <div className='admin_dashboard_assessment'>
                    <h4>Create Assessment</h4>
                    <div>
                        <p>Create test question for an incoming academy<br /> students </p>
                        <AdminClientButton text='Create Assessment' className='grayBtn' link='/admindashboard/assessment' />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DashBoardHome;
