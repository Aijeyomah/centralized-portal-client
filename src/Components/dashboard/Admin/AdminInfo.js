import React from 'react';
import './AdminInfo.css';

const Info = (props) => {
    return (
        <div className='admin_info_container'>
            <div>
                <p className='normal'>{props.text}</p>
                <p className='large'>{props.total_number}</p>
            </div>
            <p className={props.className}>{props.text2}</p>
        </div>
    );
}

export default Info;