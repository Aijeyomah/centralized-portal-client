import React, { useState, useEffect } from 'react';
import './modal.css'
import closeBtn from '../../../Images/closeBtn.svg'
import axios from 'axios'
import useSpinner from './../../../Spinner/useSpinner';
import { useHistory } from 'react-router-dom'

const Modal = ({ handleClose, show }) => {
    let history = useHistory()
    const [spinner, showSpinner, hideSpinner] = useSpinner()
    const [displaypicture, setDisplaypicture] = useState({ pictures: '' });
    const [changeProfilePic, setChangeProfilePic] = useState(false)

    const handleFile = (e) => {
        let files = e.target.files[0]
        setDisplaypicture({
            ...displaypicture,
            pictures: files,
        })
    }

    useEffect(() => {
        const userDetails = { pictures };
        const token = localStorage.getItem('token')
        let formData = new FormData()

        for (let key in userDetails) {
            formData.append(key, userDetails[key])
        }
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        }
        axios.put('/api/v1/uploadImage', formData, config)
            .then(res => {
                console.log(res)
                window.location.reload(false)
                hideSpinner()
            }).catch(err => {
                console.log(err)
            })
        axios.put('/api/v1/uploadAdminImage', formData, config)
            .then(res => {
                console.log(res)
                window.location.reload(false)
                hideSpinner()
            }).catch(err => {
                console.log(err)
            })
    }, [changeProfilePic])

    const { pictures } = displaypicture;

    const handleSubmit = (e) => {
        e.preventDefault()
        setChangeProfilePic(!changeProfilePic)
        console.log(pictures)
        handleClose();
    }
    useEffect(() => {
        console.log(changeProfilePic)
    }, [changeProfilePic])

    const style = {
        display: displaypicture.pictures ? "block" : "none",
        fontFamily: "Lato",
        fontWeight: 500,
        fontSize: "16px",
        color: "#5abefd",
        marginTop: 0,
        marginBottom: "7px",
        textAlign: "center"
    }

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <h2>Upload a profile picture</h2>
                <input type="file" name="file" id="file" className="modal_inputfile" onChange={handleFile} accept="image/png, image/jpeg" />
                <div style={style}>Upload successful!</div>
                <img className='close_icon' src={closeBtn} onClick={handleClose} />
                <button type="submit" disabled={!pictures} className='modal_button' onClick={handleSubmit}>Submit</button>
                {spinner}
            </section>
        </div>
    );
}

export default Modal;