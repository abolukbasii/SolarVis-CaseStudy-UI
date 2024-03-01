import React, { useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

const CreateUserForm = ({ onFinish, form }) => {

    const { Option } = Select;

    const roles = [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
    ];

    useEffect(() => {
      form.resetFields();
    }, [form]);

    const validatePassword = (_, value) => {
      if (value && value.length >= 8 && /[a-zA-Z]/.test(value) && /\d/.test(value)) {
        return Promise.resolve();
      }
      return Promise.reject('Password must be at least 8 characters long and contain letters and numbers.');
    }

    return (
      <Form
        name="signup"
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true, role: 'user' }}
        onFinish={onFinish}
        autoComplete="off"
        labelCol={{ span: 5 }} 
        wrapperCol={{ span: 18 }}
      >
        <Form.Item autoComplete="off" label="First Name" name="first_name" rules={[{ required: true, message: 'Please input your first name!' }]}>
          <Input />
        </Form.Item>
  
        <Form.Item autoComplete="off" label="Last Name" name="last_name" rules={[{ required: true, message: 'Please input your last name!' }]}>
          <Input />
        </Form.Item>
  
        <Form.Item autoComplete="off" label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }, { type: 'email', message: 'Please enter a valid email address' }]}>
          <Input />
        </Form.Item>
  
        <Form.Item autoComplete="off" label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }, { validator: validatePassword }]}>
          <Input.Password />
        </Form.Item>
  
        <Form.Item autoComplete="off" label="Role" name="role" rules={[{ required: true, message: 'Please select a role!' }]}>
          <Select>
            {roles.map((role) => (
              <Option key={role.value} value={role.value}>
                {role.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
  
        <Form.Item style={{textAlign:"center"}} wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            <UserAddOutlined style={{ color: 'white' }} /> Add
          </Button>
        </Form.Item>
      </Form>
    );
  };
  
  export default CreateUserForm;