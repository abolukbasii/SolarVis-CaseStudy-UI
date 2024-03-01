import React, { createContext, useContext, useState } from 'react';


const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });
  const [userData, setUserData] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { access_token: token } : null;
  });

  const login = (data, expirationTime) => {
    
    setIsLoggedIn(true);
    setUserData(data);
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("role", data.role);
    data.role === "superadmin" && localStorage.setItem("suspended", data.suspended);
    setTimeout(() => {
      logout();
    }, expirationTime * 1000);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};


