import { Button } from "antd/es/radio"
import '../App.css'
import { Table, Input, Space, Spin, Tag, Popconfirm, notification, Form, DatePicker, Modal, Select } from "antd"
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useEffect } from "react";



    const SuperAdminCreateTask = (props) =>{

    const {isModalVisible, handleCancel, form, getFormValues, users, userRole} =props;
    const { Option } = Select;

    const statusOptions = [
    { value: 'NOT_STARTED', text: 'Not Started', color: 'orange' },
    { value: 'IN_PROGRESS', text: 'In Progress', color: 'blue' },
    { value: 'COMPLETED', text: 'Completed', color: 'green' },
    ];

    useEffect(()=>{
        form.resetFields()
    },[form])

    return(
        <div>
            <Modal
                title="Create Task"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                centered
            >
                <Form
                form={form}
                name="createTaskForm"
                labelCol={{ span: 5 }} 
                wrapperCol={{ span: 18 }}
                >
                {users && userRole == "superadmin" && <Form.Item label="Assigned To" name="assignedTo"
                rules={[{ required: true, message: 'Please select an user!' }]}>
                    <Select>
                        {users.map((user) => (
                        <Select.Option key={user.id} value={user.id}>
                            {`${user.first_name} ${user.last_name}`}
                        </Select.Option>
                        ))}
                    </Select>
                </Form.Item>}
                <Form.Item
                    label="Detail"
                    name="detail"
                    rules={[{ required: true, message: 'Please enter task details!' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Due Date"
                    name="dueDate"
                    rules={[{ required: true, message: 'Please select a due date!' }]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[{ required: true, message: 'Please select a status!' }]}
                >
                    <Select placeholder="Select a status">
                    {statusOptions.map(option => (
                        <Option key={option.value} value={option.value}>
                        <Tag color={option.color}>{option.text}</Tag>
                        </Option>
                    ))}
                    </Select>
                </Form.Item>
                <Form.Item style={{textAlign:"center"}} wrapperCol={{ offset: 4, span: 16 }}>
                    <Button type="primary" htmlType="submit" onClick={getFormValues}>
                    Create
                    </Button>
                </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default SuperAdminCreateTask