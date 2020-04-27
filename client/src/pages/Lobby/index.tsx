import React, { useState, useEffect } from "react";
import { Table, Row, Col, Form, Input, Button } from "antd";
import "./index.css";
import { dummyGroup, dummyMessage } from "../../const";
import { Message } from "../../components";
import { useForm } from "antd/lib/form/util";
import axios from 'axios'
import { useLocation } from "react-router-dom";
import io from 'socket.io-client';

const { Column } = Table;
const queryString = require('query-string');

interface IGroup {
  name: string;
  id: string;
}
interface IMessage {
  message: string;
  sender: string;
}

export default (value:any) => {

  const socket = io('http://localhost:8080');
  const location = useLocation();
  const [allGroups, setAllGroups] = useState<Array<IGroup>>([]);
  const [myGroups, setMyGroups] = useState<Array<IGroup>>([]);
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [username, setUsername] = useState(location.state)
  const [form] = Form.useForm();
  useEffect(() => {
    setAllGroups(dummyGroup);
    setMyGroups(dummyGroup);
    setMessages(dummyMessage);
  }, []);

  const sendMessage = (values: any) => {
    console.log(values);
    // TODO emit message to this group
    setMessages(messages.concat([{ message: values.msg, sender: "me" }]));
    form.resetFields();
    form.scrollToField(["msg"]);
    socket.emit('msgToServer', {username: username ,message: String(value).toString(),groupname: 'group2' });
  };

  const createGroup = (value:any) => {
    let form =  {groupname:value.groupName,members:[username],messages:[]}
    console.log(form);
    axios
    .put("http://localhost:8080/group",form)
    .then((res) => {
      console.log(res); 
    })
    .catch((err) => {
      console.log(err);
    });
  };
  socket.on('msgToClient', function(data:any){console.log(data)});
 
  return (
    <div>
      <Row className="lobby-title" justify="center">
        <h1>Shit-chat</h1>
      </Row>
      <h2>Login as : {username}</h2>
      <Row className="lobby-table-container">
        <Col span={8} offset={1}>
          <h1 style={{ fontFamily: "Prompt" }}>All groups</h1>
          <Row>
            <Col span={24}>
              <Table
                bordered
                className="lobby-table"
                dataSource={allGroups}
                pagination={false}
                size="small"
              >
                <Column
                  title="Name"
                  dataIndex="name"
                  key="groupName"
                  align="center"
                  ellipsis
                />
                <Column
                  title="Action"
                  dataIndex="action"
                  key="action"
                  align="center"
                  ellipsis
                />
              </Table>
            </Col>
          </Row>
          <h1 style={{ fontFamily: "Prompt" }}>My groups</h1>

          <Form className="login-form" onFinish={createGroup} name="login-form">
            <Form.Item name="groupName" required>
              <Input size="large" placeholder="New group" />
            </Form.Item>
            <Form.Item>
              <Button size="middle" type="primary" htmlType="submit" block>
                CREATE GROUP
              </Button>
            </Form.Item>
          </Form>
          <Row>
            <Col span={24}>
              <Table
                bordered
                className="lobby-table"
                dataSource={myGroups}
                pagination={false}
              >
                <Column
                  title="Name"
                  dataIndex="name"
                  key="groupName"
                  align="center"
                />
                <Column
                  title="Action"
                  dataIndex="action"
                  key="action"
                  align="center"
                />
              </Table>
              <Row>
                <Col span={20}>
                  <Form.Item>
                    <Input size="large" placeholder="Enter your group name" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item>
                    <Button size="large" type="primary" htmlType="submit" block>
                      SEND
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={12} offset={1}>
          <div className="chat-room">
            <Row className="room-navbar" justify="center">
              Room name
            </Row>
            {messages.map((m, idx) => (
              <div className={`${m.sender === "me" ? "myMessage" : ""}`}>
                <Message isMine key={idx}>
                  {m.message}
                </Message>
              </div>
            ))}
          </div>
          <Form onFinish={sendMessage} form={form}>
            <Row>
              <Col span={20}>
                <Form.Item name="msg">
                  <Input size="large" suffix={<span></span>} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item>
                  <Button size="large" type="primary" htmlType="submit" block>
                    SEND
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
