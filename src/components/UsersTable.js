import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Popconfirm, Space, Tag, Select, Input, Spin, notification, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, StopOutlined, CheckOutlined } from '@ant-design/icons';
import moment from 'moment';
import EditUserModal from "./EditUserModal";
import { UserService } from "../Service/UserService";
const UsersTable = (props) => {
  const { users, isLoading, handleDelete, userRole, handleSuspend, handleUnSuspend, userId, fetchData } = props;
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const userService = new UserService()
  const getRoleColor = (role) => {
    switch (role) {
      case 'user':
        return 'blue';
      case 'admin':
        return 'red';
      case 'superadmin':
        return 'green';
      default:
        return '';
    }
  };


  const showEditModal = (userData) => {
    setSelectedUserData(userData);
    setEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setSelectedUserData(null);
  };


  const handleUpdate = (updatedUserData) => {
    const response = userService.updateUserbyAdmin(updatedUserData);
      response.then(res => {
        setEditModalVisible(false)
        if (res.success) {
            notification.success({
              message: 'Success!',
              description: res.detail,
            });
        }
        else{
          notification.error({
            message: 'Error!',
            description: res.detail,
          });
        }
        fetchData();
    })
  };


  const columns = [
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
      sorter: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix(),
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
      sorter: (a, b) => moment(a.updated_at).unix() - moment(b.updated_at).unix(),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      sorter: (a, b) => a.first_name.localeCompare(b.first_name),
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
      sorter: (a, b) => a.last_name.localeCompare(b.last_name),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'User', value: 'user' },
        { text: 'Admin', value: 'admin' },
        { text: 'Superadmin', value: 'superadmin' },
      ],
      onFilter: (value, record) => record.role === value,
      render: (text, record) => (
        <Tag color={getRoleColor(record.role)}>{text}</Tag>
      ),
    },
    {
        title: 'Suspended',
        dataIndex: 'suspended',
        key: 'suspended',
        filters: [
          { text: 'Suspended', value: true },
          { text: 'Active', value: false },
        ],
        onFilter: (value, record) => record.suspended === value,
        render: (text) => (
          <Tag color={text ? 'red' : 'green'}>{text ? 'Suspended' : 'Active'}</Tag>
        ),
      },
    {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
          <Space size="small">
            {!record.suspended && <Tooltip title="Edit">
                <Button style={{ background: '#34ced9', borderColor: '#34ced9', marginRight: 8 }} onClick={() => showEditModal(record)} icon={<EditOutlined style={{ color: 'white' }} />}></Button>
            </Tooltip>}
            
            {userRole==='superadmin' &&<Popconfirm
              title="Are you sure you want to delete this user?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
            <Tooltip title="Delete">
                <Button style={{ background: '#ff4d4f', borderColor: '#ff4d4f', marginRight: 8 }} icon={<DeleteOutlined style={{ color: 'white' }} />}></Button>
            </Tooltip>

            </Popconfirm>}
            {record.suspended && (userRole==='superadmin' || (record.suspended_by === userId && record.last_edited_by === userId)) ? (
            <Popconfirm
            title="Are you sure you want to unsuspend this user?"
            onConfirm={() => handleUnSuspend(record.id)}
            okText="Yes"
            cancelText="No"
            >
            <Tooltip title="Unsuspend">
                <Button style={{ background: '#4CAF50', borderColor: '#4CAF50', marginRight: 8 }} icon={<CheckOutlined style={{ color: 'white' }} />}></Button>
            </Tooltip>
            </Popconfirm>
            ) : !record.suspended && (
            <Popconfirm
            title="Are you sure you want to suspend this user?"
            onConfirm={() => handleSuspend(record.id)}
            okText="Yes"
            cancelText="No"
            >
            <Tooltip title="Suspend">
                <Button style={{ background: '#F57C00', borderColor: '#F57C00', marginRight: 8 }} icon={<StopOutlined style={{ color: 'white' }} />}></Button>
            </Tooltip>
            </Popconfirm>
            )}
          </Space>
        ),
      },
  ];

  return (
    <div>
      {isLoading ? (
            <Spin tip="Loading...">
                <Table
                dataSource={[]}
                columns={columns.map(column => ({ ...column, align: 'center' }))}
                pagination={false}
                scroll={{y: "calc(100vh - 160px)"}}
/>
            </Spin>
            ) : (
            <Table
                dataSource={users}
                columns={columns.map(column => ({ ...column, align: 'center' }))}
                pagination={false}
                scroll={{y: "calc(100vh - 160px)"}}
            />)}
            <EditUserModal
                visible={isEditModalVisible}
                handleCancel={handleEditCancel}
                userData={selectedUserData}
                handleUpdate={handleUpdate}
            />
    </div>
  );
};



export default UsersTable;
