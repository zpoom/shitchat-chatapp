import React, { Fragment } from 'react';
import { Row } from 'antd';
import './index.css';
interface MessageProps {
    children: any;
    isMine: boolean;
    sender: string;
}


export default ({ children, isMine = true, sender }: MessageProps) => {
    return (
        <Fragment>
            <p>{sender}</p>
            <div className={`message-box ${isMine ? 'mine' : ''}`}>
                {children}
            </div>
        </Fragment>
    )
}