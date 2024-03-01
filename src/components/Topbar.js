import React, { useState } from 'react';
import { Button, Dropdown, Menu, Modal, Tooltip, notification } from 'antd';
import { LogoutOutlined, UserOutlined, PauseCircleOutlined, PlayCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { useAuth } from '../auth-context';
import { useNavigate } from 'react-router-dom';
import './Topbar.css';
import { UserService } from '../Service/UserService';
import UpdateUserForm from './UpdateUserForm';
import { OrganizationService } from '../Service/OrganizationService';

const Topbar = ({ onToggleSidebar }) => {
  const userService = new UserService()
  const organizationService = new OrganizationService
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isModalVisible, setModalVisible] = useState(false)
  const [userData, setUserData] = useState()
  const userRole = localStorage.getItem('role')
  const [organizationSuspended, setOrganizationSuspended] = useState(localStorage.getItem('suspended')=="true")
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleUpdateUser = async () => {
    try {
      const response = await userService.getUserInfo();
      if (response.success) {
        setModalVisible(true);
        setUserData(response.object);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  
  const suspendOrganization = async () => {
    const response = organizationService.suspendOrganization()
    response.then(res => {
      if (res.success) {
          notification.success({
            message: 'Success!',
            description: res.detail,
        });
        localStorage.setItem('suspended', "true")
        setOrganizationSuspended(true)
      }
      else{
        notification.error({
          message: 'Error!',
          description: res.detail,
        });
      }
    })
  }
  const unsuspendOrganization = async () => {
    const response = organizationService.unsuspendOrganization()
    response.then(res => {
      if (res.success) {
          notification.success({
            message: 'Success!',
            description: res.detail,
        });
        localStorage.setItem('suspended', "false")
        setOrganizationSuspended(false)
      }
      else{
        notification.error({
          message: 'Error!',
          description: res.detail,
        });
      }
    })
  }

  const handleCancel = () =>{
    setModalVisible(false)
  }

  
const menu = (
  <Menu>
    <Menu.Item key="editProfile" onClick={handleUpdateUser} icon={<UserOutlined/>}>
      Edit Profile
    </Menu.Item>
    {!organizationSuspended && (
      <Menu.Item key="suspendOrganization" onClick={suspendOrganization} icon={<PauseCircleOutlined/>}>
        Suspend Organization
      </Menu.Item>
    )}
    {organizationSuspended && (
      <Menu.Item key="unsuspendOrganization" onClick={unsuspendOrganization} icon={<PlayCircleOutlined/>}>
        Unsuspend Organization
      </Menu.Item>
    )}
  </Menu>
);


  return (
    <div className="topbar">
      <Button onClick={onToggleSidebar} className="toggle-button">
        ☰
      </Button>
      <div className="topbar-right">
        {userRole === 'superadmin' && <Dropdown overlay={menu} trigger={['click']}>
          <Button icon={<SettingOutlined />} />
        </Dropdown>}
        {userRole != 'superadmin' && <Tooltip title="Edit Profile"><Button onClick={handleUpdateUser} icon={<UserOutlined />}/></Tooltip>}
        <Tooltip title="Log Out">
          <Button onClick={handleLogout} icon={<LogoutOutlined />} />
        </Tooltip>
      </div>
      <Modal centered visible={isModalVisible} title="Edit Profile" onCancel={handleCancel} footer={null}>
        <UpdateUserForm userData={userData} handleCancel={handleCancel} setModalVisible={setModalVisible}/>
      </Modal>
    </div>
  );
};

export default Topbar;
