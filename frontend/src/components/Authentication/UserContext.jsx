// context/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    username: "",
    role: "",
  });

  const checkSession = async () => {
    try {
      const response = await axios.get(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/Authentication/GetSessionData.php",
        { withCredentials: true }
      );
      if (response.data.loggedIn) {
        setUser({
          isLoggedIn: true,
          username: response.data.username,
          role: response.data.role,
        });
      }
    } catch (error) {
      console.error("Session check failed", error);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = (data) => {
    setUser({
      isLoggedIn: true,
      username: data.username,
      role: data.role,
    });
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/Authentication/Logout.php",
        {},
        { withCredentials: true }
      );
      setUser({
        isLoggedIn: false,
        username: "",
        role: "",
      });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
