import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
const { Option } = Select;

const EditUserModal = ({ visible, handleCancel, userData, handleUpdate }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(userData);
  }, [userData, form]);

  const onFinish = (values) => {
    handleUpdate(values);
    handleCancel();
  };

  return (
    <Modal
      visible={visible}
      title="Edit User"
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <Form
        style={{ maxWidth: 600 }}
        form={form}
        name="updateUserForm"
        initialValues={userData}
        onFinish={onFinish}
        labelCol={{ span: 6 }} 
        wrapperCol={{ span: 18 }}
      >
        <Form.Item label="Username (Email)" name="username">
          <Input disabled />
        </Form.Item>

        <Form.Item label="First Name" name="first_name" rules={[{ required: true, message: 'Please enter first name' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Last Name" name="last_name" rules={[{ required: true, message: 'Please enter last name' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Role" name="role">
          <Select disabled>
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
            <Option value="superadmin">Superadmin</Option>
          </Select>
        </Form.Item>

        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
          <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
