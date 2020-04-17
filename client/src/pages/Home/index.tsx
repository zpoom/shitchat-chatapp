import React from 'react';
import './index.css';
import { Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';
export default () => {
    const history = useHistory();

    const submitForm = (values: any) => {
        console.log(values)
        history.push('/lobby');
    }

    return (
        <div className="home">
            <div className='home-content'>
                <h1 className='greeting-msg'>Welcome to Shit-Chat.</h1>
                <Form className='login-form' onFinish={submitForm} name='login-form'>
                    <Form.Item name='name' required>
                        <Input size="large" placeholder='Enter your name.'></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button size='large' htmlType='submit'>Go</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}