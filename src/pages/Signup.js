import React from 'react';
import { UserService } from '../Service/UserService';
import { Button, Form, Input, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import './Login.css'
import { Link } from 'react-router-dom';
import { notification } from 'antd';
export default function Signup({setShowSignup}) {

    const roles = [
        { value: 'basic_user', label: 'Basic User' },
        { value: 'admin', label: 'Admin' },
        { value: 'superadmin', label: 'Superadmin' },
    ];

    const userService = new UserService();

    const onFinish = (signupData) => {
        try{
            const response = userService.signup(signupData);
            response.then(res => {
                if (res.data.success) {
                    notification.success({
                        message: 'Signup Completed',
                        description: res.data.detail,
                      });
                } else {
                    notification.error({
                        message: 'Signup Failed!',
                        description: res.data.detail,
                      });
                }
            })
        } catch (error) {
            console.error("Error during signup:", error);
          }

    };

    const validatePassword = (_, value) => {
        if (value && value.length >= 8 && /[a-zA-Z]/.test(value) && /\d/.test(value)) {
          return Promise.resolve();
        }
        return Promise.reject('Password must be at least 8 characters long and contain letters and numbers.');
    };

    return (
        <div className="loginContainer">
            <div className="loginForm">
                <h2>SIGNUP</h2>
                <Form
                    name="signup"
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true, role: 'basic_user' }}
                    onFinish={onFinish}
                    autoComplete="off"
                    labelCol={{ span: 5 }} 
                    wrapperCol={{ span: 18 }}
                >
                    <Form.Item label="First Name" name="first_name" rules={[{ required: true, message: 'Please input your first name!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Last Name" name="last_name" rules={[{ required: true, message: 'Please input your last name!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Email" name="username" rules={[{ required: true, message: 'Please input your username!' }, { type: 'email', message: 'Please enter a valid email address' }]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }, { validator: validatePassword }]}>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item label="Role" name="role">
                        <Select>
                            {roles.map((role) => (
                                <Option key={role.value} value={role.value}>
                                    {role.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
                Have an account? <Link to="/login">Login</Link>
            </div>
            
        </div>
    );
}