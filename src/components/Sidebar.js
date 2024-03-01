import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons';
import './Sidebar.css';

const Sidebar = ({ isSidebarCollapsed}) => {
  const location = useLocation();
  const userRole = localStorage.getItem('role');
  return (
    <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
        <Menu.Item key="/dashboard" icon={<DashboardOutlined />} className="menu-item">
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        {userRole && userRole !== 'user' && (
          <Menu.Item key="/users" icon={<UserOutlined />} className="menu-item">
            <Link to="/users">Users</Link>
          </Menu.Item>
        )}
        {userRole && userRole !== 'user' && (
          <Menu.Item key="/tasks" icon={<AppstoreAddOutlined />} className="menu-item">
            <Link to="/tasks">Tasks</Link>
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
};

export default Sidebar;
