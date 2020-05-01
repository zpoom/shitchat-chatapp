import React, { Fragment } from 'react';
import { Row } from 'antd';
import './index.css';
interface MessageProps {
    children: any;
    isMine: boolean;
    sender: string;
    time:string
}


export default ({ children, isMine = true, sender ,time}: MessageProps) => {
    return (
        <Fragment>
            <p><strong>{sender}</strong></p>
            <div className={`message-box ${isMine ? 'mine' : ''}`}>
                {children}
            </div>
             <p>Time : {time}</p>
        </Fragment>
    )
}