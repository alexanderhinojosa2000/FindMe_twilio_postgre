import React, { Fragment, useContext } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Button
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authContext } from '../providers/Authprovider'

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const LoginForm = () => {
  const [form] = Form.useForm();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(authContext);

  const onFinish = (values) => {
    const url = "http://localhost:3001/api/login"
    const loginInfo = {
      ...values
    }

    // console.log('Received values of form: ', values);
    axios.post(url, loginInfo)
      .then(res => {
        if (res.status === 200) {
          const id = res.data.id;
          login(id, res.data.firstName, res.data.lastName, res.data.username, res.data.phoneNumber, res.data.email);
          navigate(`/mypage/${id}`, { replace: true });
        }
      })
      .catch(err => {
        const errorMessage = err.response.data.message;
        setMessage(errorMessage);
      })
  };

  return (
    <Fragment>
      <p>{message}</p>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        // initialValues={{
        //   residence: ['zhejiang', 'hangzhou', 'xihu'],
        //   prefix: '86',
        // }}
        scrollToFirstError
      >

        {/* <Row gutter={2}>  */}
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: 'Please input your Username'
            },
          ]}
        >
          <Input style={{ width: '50%' }} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password style={{ width: '50%' }} />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>&nbsp;&nbsp;
          Or&nbsp;&nbsp; <Link to="/sign-up">Register now!</Link>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default LoginForm;