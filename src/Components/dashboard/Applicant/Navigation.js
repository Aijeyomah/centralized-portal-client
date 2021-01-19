import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion'

const Navigation = (props) => {
    return (
        <NavLink onClick={props.clicked} exact to={props.url} className={props.className} activeClassName={props.activeClassName}>
            <motion.div whileHover={props.whileHover} className="one">
                <div className="dash-icon">
                    <img src={props.src} alt="dash" />
                </div>
                <p>{props.text}</p>
            </motion.div>
        </NavLink>
    );
}

export default Navigation;