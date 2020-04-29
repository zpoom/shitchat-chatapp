import React from "react";
import "./index.css";
import { Form, Input, Button } from "antd";
import { useHistory } from "react-router-dom";

import axios from "axios";
import io from 'socket.io-client';

export default () => {
  const history = useHistory()
  const socket = io('http://localhost:8080');
  const submitForm = (values: any) => {
    console.log(values.name)
    var date = new Date();
    let data = { username: values.name, latestReadTime: [] };
    axios
      .put("http://localhost:8080/user", data)
      .then((res) => {
        console.log(res); 
        history.push({pathname: '/lobby',
        state: String(values.name).toString()});
      })
      .catch((err) => {
        console.log(err);
      });
   
  };

  return (
    <div className="home">
      <div className="home-content">
        <h1 className="greeting-msg">Welcome to Shit-Chat.</h1>
        <Form className="login-form" onFinish={submitForm} name="login-form">
          <Form.Item name="name" required>
            <Input size="large" placeholder="Enter your name."></Input>
          </Form.Item>
          <Form.Item>
            <Button size="large" htmlType="submit">
              Go
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
