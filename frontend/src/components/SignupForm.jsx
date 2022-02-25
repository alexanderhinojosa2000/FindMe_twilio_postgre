import React ,{ Fragment, useContext } from 'react';
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

const SignUpForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { login } = useContext(authContext);

  const onFinish = (values) => {
    const url = "http://localhost:3001/api/signup"
    const newUser = {
      ...values
    }

    // console.log('Received values of form: ', newUser);
    axios.post(url, newUser)
      .then(res => {
        if (!res.status === 200) {
          navigate(`/home`, { replace: true });
        }
        const id = res.data.id;
          login(id, res.data.firstName, res.data.lastName, res.data.username, res.data.phoneNumber, res.data.email);
          navigate(`/mypage/${id}`, { replace: true });
      })
      .catch(err => {
        const errorMessage = err.response.data.message;
        setMessage(errorMessage);
      })

  };

  return (
    <div className='SignUpForm'>
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

        <Form.Item
          name="first_name"
          label="First Name"

          rules={[
            {
              required: true,
              message: 'Please input your first name'
            },
          ]}
        >
          <Input style={{ width: '50%' }} placeholder="First Name" />
        </Form.Item>

        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[
            {
              required: true,
              message: 'Please input your Last name'
            },
          ]}
        >
          <Input style={{ width: '50%' }} placeholder="Last Name" />
        </Form.Item>


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
          name="phone_number"
          label="Phone number"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input style={{ width: '50%' }} placeholder="Phone number" />
        </Form.Item>

        {/* </Row> */}

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input style={{ width: '50%' }} />
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
          hasFeedback
        >
          <Input.Password style={{ width: '50%' }} />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password style={{ width: '50%' }} />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>&nbsp;&nbsp;
          Or&nbsp;&nbsp; <Link to="/login">Login</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpForm;