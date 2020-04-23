import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Form, Input, Button } from 'antd';
import './index.css';
import { dummyGroup , dummyMessage } from '../../const';
import { Message } from '../../components';
import { useForm } from 'antd/lib/form/util';
const { Column } = Table;

interface IGroup {
    name: string;
    id: string;
}
interface IMessage {
    message: string;
    sender: string;
}

export default () => {
    const [allGroups, setAllGroups] = useState<Array<IGroup>>([]);
    const [myGroups, setMyGroups] = useState<Array<IGroup>>([]);
    const [messages, setMessages] = useState<Array<IMessage>>([]);
    const [form] = Form.useForm();
    useEffect(() => { 
        setAllGroups(dummyGroup);
        setMyGroups(dummyGroup);
        setMessages(dummyMessage)
    }, [])
    const sendMessage = (values: any) => {
        console.log(values);
        // TODO emit message to this group
        setMessages(messages.concat([{ message: values.msg, sender: 'me' }]));
        form.resetFields();
        form.scrollToField(['msg'])
    }
    return (
        <div>
            <Row className='lobby-title' justify='center'><h1>Shit-chat</h1></Row>
            <Row className='lobby-table-container'>
                <Col span={8} offset={1}>
                    <h1 style={{ fontFamily: 'Prompt' }}>All groups</h1>
                    <Row>
                        <Col span={24}>
                            <Table bordered className='lobby-table' dataSource={allGroups} pagination={false} size='small'>
                                <Column title='Name' dataIndex='name' key='groupName' align='center' ellipsis />
                                <Column title='Action' dataIndex='action' key='action' align='center' ellipsis />
                            </Table>
                        </Col>
                    </Row>
                    <h1 style={{ fontFamily: 'Prompt' }}>My groups</h1>
                    <Row>
                        <Col span={24}>
                            <Table bordered className='lobby-table' dataSource={myGroups} pagination={false}>
                                <Column title='Name' dataIndex='name' key='groupName' align='center' />
                                <Column title='Action' dataIndex='action' key='action' align='center' />
                            </Table>
                            <Row>
                                <Col span={20}>
                                    <Form.Item>
                                        <Input size='large' placeholder='Enter your group name' />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item>
                                        <Button size='large' type='primary' htmlType='submit' block>SEND</Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col span={12} offset={1}>
                    <div className='chat-room'>
                        <Row className='room-navbar' justify='center'>
                            Room name
                        </Row>
                        {messages.map((m, idx) => <div className={`${m.sender === 'me' ? 'myMessage' : ''}`}><Message isMine key={idx}>{m.message}</Message></div>)}
                    </div>
                    <Form onFinish={sendMessage} form={form}>
                        <Row>
                            <Col span={20}>
                                <Form.Item name='msg'>
                                    <Input size='large' suffix={<span></span>} />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item>
                                    <Button size='large' type='primary' htmlType='submit' block>SEND</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div >
    )
}