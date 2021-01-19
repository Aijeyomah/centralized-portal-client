import React from 'react'
import pageNotFound from '../../../Images/404-page.svg'
import './NotFound.css'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFound = () => {
    return (
        <div className="not-found">
            <div >
                <img src={pageNotFound} alt="404 page" />
            </div>
            <Link to="/">
                <motion.button whileHover={{ scale: 1.1, backgroundColor: "rgb(15, 155, 87)" }}>
                    Back to Homepage</motion.button>
            </Link>
        </div>
    )
}

export default NotFound
