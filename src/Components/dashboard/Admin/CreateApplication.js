import React, { useState } from 'react';
import uploadIcon from '../../../Images/upload-icon.svg';
import './CreateApplication.css'
import axios from 'axios'
import { motion } from 'framer-motion'

const CreateApplication = () => {
    const [state, setState] = useState({
        link: '',
        application_closure_date: '',
        batch_id: '',
        instructions: '',
        file_upload: ''
    })

    const handleChange = e => {
        setState({
            ...state,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { link, application_closure_date, batch_id, instructions, file_upload } = state
        let applicationDetails = { link, application_closure_date, batch_id, instructions, file_upload }
        let admin_file = file_upload

        if (admin_file) {
            setState({
                link: '',
                application_closure_date: '',
                batch_id: '',
                instructions: '',
                file_upload: ''
            })
            console.log(admin_file)
            const token = localStorage.getItem('token')
            var formData = new FormData()

            for (var key in applicationDetails) {
                formData.append(key, applicationDetails[key])
            }
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                }
            }
            axios.post("/api/v1/auth/createApplication", formData, config)
                .then(res => {
                    console.log(res)
                }
                ).catch(err => {
                    console.log(err.message)
                })
        } else { alert("Upload your CV") };
    }

    const handleFile = (e) => {
        let files = e.target.files[0]
        setState({
            ...state, file_upload: files,

        })

    }
    const style = {
        display: state.file_upload ? "block" : "none",
        fontWeight: 500,
        fontSize: "16px",
        color: "#5abefd",
        margin: "7px 0",
        textAlign: "center",
        width: '370px'
    }

    return (
        <div className="application-wrapper">
            <div>
                <h2>Create Application</h2>
            </div>
            <form className="form-wrapper" onSubmit={handleSubmit}>
                <div className="application-first-row">
                    <div className="application-file-container">
                        <div><img className="upload-icon" src={uploadIcon} alt="Upload icon" /></div>
                        <input type="file" name="file" id="file_upload" className="application-input-file" onChange={handleFile} />
                        <label htmlFor="file_upload">Upload CV</label>
                    </div>

                    <div>
                        <label>Link</label>
                        <br />
                        <input value={state.link} id="link" type="text"
                            pattern="^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$"
                            onChange={handleChange} required /><br />
                    </div>
                </div>
                <div style={style}>Upload successful!</div>
                <div className="application-second-row">
                    <div>
                        <label>Application closure date</label>
                        <br />
                        <input value={state.application_closure_date} id="application_closure_date" type="text" placeholder="dd-mm-yyyy" required
                            pattern="([12][0-9]|3[01]|0?[1-9])-(0?[1-9]|1[012])-((?:19|20)\d\d)" onChange={handleChange} /><br />
                    </div>
                    <div>
                        <label>Batch Id</label>
                        <br />
                        <input value={state.batch_id} id="batch_id" type="number" onChange={handleChange} required /><br />
                    </div>
                </div>
                <div className="application-third-row">
                    <div>
                        <label>Instructions</label>
                        <br />
                        <textarea value={state.instructions} id="instructions" type="text" onChange={handleChange} required /><br />
                    </div>
                </div>
                <motion.button whileHover={{ scale: 1.1 }} className='applicationBtn' type="submit">Submit</motion.button>
            </form>
        </div>
    )
}

export default CreateApplication