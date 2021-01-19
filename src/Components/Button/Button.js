import React from "react";
import './Button.css'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export const FormButton = (props) => {
    return (
        <motion.button whileHover={{ scale: 1.1 }}
            onClick={props.onclick} disabled={props.disabled}
            className={props.disabled ? 'disabled' : 'submitBtn'}
            type='Submit'>{props.text}
        </motion.button>
    );
}

export const ClientButton = (props) => {
    return (
        <Link to={props.link}>
            <div style={{ display: props.status === "Taken" ? "none" : "block", position: "relative", margin: 0, marginLeft: "50%", left: "-100px", textDecoration: "none" }}>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    disabled={!props.created_at || props.status === "Taken"}
                    className={props.className} type='button'>{props.text}
                </motion.button>
            </div>
        </Link>
    );
}

export const AdminClientButton = (props) => {
    return (
        <Link to={props.link}> <motion.button whileHover={{ scale: 1.1 }}
            className={props.className}
            type='button'>{props.text}
        </motion.button>
        </Link>
    );
}