import { Modal, Form, Input, Button, Select, notification } from 'antd';
import { UserService } from '../Service/UserService';
import { useEffect } from 'react';
const { Option } = Select;
const userService = new UserService()
const UpdateUserForm = ({ userData, handleCancel, setModalVisible }) => {
  const [editUserForm] = Form.useForm();

  const onFinish = async (values) => {
    const res = await userService.updateUser(values);
    if (res.success) {
      notification.success({
        message: 'Success',
        description: 'Updated the user data',
      });
      setModalVisible(false)
    }
  };
  useEffect(() => {
    editUserForm.setFieldsValue(userData);
  }, [userData]);

  return (
    <Form
      form={editUserForm}
      name="updateUserForm"
      initialValues={userData}
      onFinish={onFinish}
      labelCol={{ span: 5 }} 
      wrapperCol={{ span: 18 }}
    >
      <Form.Item label="Username:" name="username">
        <Input disabled />
      </Form.Item>

      <Form.Item label="First Name:" name="first_name" rules={[{ required: true, message: 'Please enter first name' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Last Name:" name="last_name" rules={[{ required: true, message: 'Please enter last name' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Role:" name="role">
        <Select disabled>
          <Option value="user">User</Option>
          <Option value="admin">Admin</Option>
          <Option value="superadmin">Superadmin</Option>
        </Select>
      </Form.Item>

      <Form.Item style={{ textAlign: 'center' }} wrapperCol={{ offset: 4, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
        <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateUserForm;