import {React, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContextProvider, useAuth } from './auth-context';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Tasks from './pages/Tasks';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/*"
            element={<AuthenticatedRoutes />}
          />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
};

const AuthenticatedRoutes = () => {
  const authCtx = useAuth();
  const userRole = authCtx?.userData?.role
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return authCtx.isLoggedIn ? (
    <div style={{backgroundColor:"rgb(210, 210, 211)"}}>
      <div>
        <Sidebar isSidebarCollapsed={isSidebarCollapsed} userRole={userRole}/>
      </div>
      <div>
        <Topbar onToggleSidebar={toggleSidebar}/>
        <Routes>
          <Route path="/dashboard" element={<Dashboard isSidebarCollapsed={isSidebarCollapsed}/>} />
          {userRole !== "user" && <Route path="/users" element={<Users userRole = {userRole} isSidebarCollapsed={isSidebarCollapsed}/>} />}
          {userRole !== "user" && <Route path="/tasks" element={<Tasks userRole = {userRole} isSidebarCollapsed={isSidebarCollapsed}/>} />}
        </Routes>
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default App;
