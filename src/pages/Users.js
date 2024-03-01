import {React, useState, useEffect} from "react"
import { Table, Input, Space, Spin, Tag, Popconfirm, notification, Form, DatePicker, Modal, Select, Button } from "antd"
import { UserAddOutlined } from '@ant-design/icons';
import {UserService} from '../Service/UserService'
import UsersTable from "../components/UsersTable";
import CreateUserForm from "../components/CreateUserForm";

const Users = ({isSidebarCollapsed}) =>{
    const userService = new UserService()
    const [users, setUsers] = useState([])
    const [userId, setUserId] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [userRole, setUserRole] = useState()
    const [isCreateUserModalVisible, setIsCreateUserModalVisible] = useState(false);
    const [createUserForm] = Form.useForm()
    const fetchData = async () => {
        try {
          const res = await userService.getAllUsers();
          setIsLoading(false)
          if (res.success) {
            setUsers(res.users)
            setUserRole(res.userRole)
            setUserId(res.userId)
          }
        } catch (error) {
          console.error('Error fetching user tasks:', error);
        }
    };

    useEffect(()=>{
      fetchData()
    },[])


    const showModal = () => {
      setIsCreateUserModalVisible(true);
    };
    const handleDelete = async (deleteUserId) => {
      try {
        const res = await userService.deleteUser({'userId': deleteUserId});
        if (res.success) {
          notification.success({
            message: 'User Deleted',
            description: res.detail,
          });
          fetchData();
        } else {
          notification.error({
            message: 'Error',
            description: res.detail,
          });
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };

    const handleCreateUserFinish = async (values) => {
      const response = userService.addUser(values)
      response.then(res => {
        setIsCreateUserModalVisible(false)
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
    
    const handleCreateUserCancel = () => {
      setIsCreateUserModalVisible(false);
    };
    
    const handleSuspend = async (userId) => {
      const response = userService.suspendUser({'userId': userId});
      response.then(res => {
        setIsCreateUserModalVisible(false)
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

    const handleUnSuspend = async (userId) => {
      const response = userService.unsuspendUser({'userId': userId});
      response.then(res => {
        setIsCreateUserModalVisible(false)
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


    
    const header = localStorage.getItem('role') === 'superadmin' ? 'Users in the Organization' : 'Basic Users in the Organization'
    
    return (
      <div className={isSidebarCollapsed ? "container-collapsed" : "container"}>
        <div style={{height: "40px", display: "flex", alignItems: "center" }}>
          <h2 style={{margin: 0 }}>{header}</h2>

          {userRole === 'superadmin' && (
            <div style={{ marginLeft: "auto", marginRight: "1em" }}>
              <Button
                type="primary"
                onClick={showModal}
                style={{ background: '#1890ff', borderColor: '#1890ff' }}
              >
                <UserAddOutlined style={{ color: 'white' }} /> Add User
              </Button>
            </div>
          )}
        </div>
          <Modal
              title="Create User"
              visible={isCreateUserModalVisible}
              onCancel={handleCreateUserCancel}
              footer={null}
              centered
            >
              <CreateUserForm onFinish={handleCreateUserFinish} form={createUserForm} />
            </Modal>
        <UsersTable users={users} userRole={userRole} isLoading={isLoading} fetchData={fetchData}
        handleDelete={handleDelete} handleSuspend={handleSuspend} handleUnSuspend={handleUnSuspend} userId={userId}></UsersTable>
      </div>
    );

}

export default Users