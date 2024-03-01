import React, { useContext } from 'react';
import { UserService } from '../Service/UserService';
import { Button, Form, Input } from 'antd';
import './Login.css';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../auth-context';

import { notification } from 'antd';

export default function Login({ setShowSignup }) {
  const userService = new UserService();
  const { login } = useAuth();

  const onFinish = async (loginData) => {
    try {
      const response = await userService.login(loginData);
      if (response.data.success) {
        login(response.data, response.data.expires_date * 60);
        window.location.href="/dashboard"
      } else {
        notification.error({
          message: 'Login Failed',
          description: response.data.detail,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  if (useAuth().isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="loginContainer">
      <div className="loginForm">
        <h2>LOGIN</h2>
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          labelCol={{ span: 5 }} 
          wrapperCol={{ span: 18 }}
        >
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
