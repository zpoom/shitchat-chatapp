import React from 'react';
import { Row } from 'antd';
import './index.css';
interface MessageProps {
    children: any;
    isMine: boolean;
}


export default ({ children, isMine = true }: MessageProps) => {
    return (
        <div className={`message-box ${isMine ? 'mine' : ''}`}>
            {children}
        </div>
    )
}