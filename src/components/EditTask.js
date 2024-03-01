import { Button, Modal, Form, Input, DatePicker, Select } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useEffect } from 'react';
import dayjs from 'dayjs'
const EditTask = (props) => {
    const { isModalVisible, handleCancel, form, getFormValues, initialTask, users } = props;
    const { Option } = Select;
    form.resetFields()
    
    const statusOptions = [
        { value: 'NOT_STARTED', text: 'Not Started', color: 'orange' },
        { value: 'IN_PROGRESS', text: 'In Progress', color: 'blue' },
        { value: 'COMPLETED', text: 'Completed', color: 'green' },
    ];
    

    useEffect(() => {
        
        form.setFieldsValue({
            assigned_to: initialTask?.asigned_to,
            detail: initialTask?.detail,
            due_date: initialTask ? dayjs(initialTask.due_date, 'YYYY-MM-DD') : null,
            status: initialTask?.status,
        });
    }, [initialTask, form]);
    return (
        <Modal
            title="Edit Task"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            centered
        >
            <Form
                form={form}
                name="editTaskForm"
                labelCol={{ span: 5 }} 
                wrapperCol={{ span: 18 }}
            >
                <Form.Item
                    label="Detail"
                    name="detail"
                    rules={[{ required: true, message: 'Please enter task details!' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Due Date"
                    name="due_date"
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
                        {statusOptions.map((option) => (
                            <Option key={option.value} value={option.value}>
                                {option.text}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item style={{ textAlign: "center" }} wrapperCol={{ offset: 4, span: 16 }}>
                    <Button type="primary" htmlType="submit" onClick={getFormValues}>
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditTask;
