import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    firstName: "",
    lastName: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      const response = await axios.get(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/Authentication/GetSessionData.php",
        { withCredentials: true }
      );
      console.log("Session Response:", response.data);

      if (response.data.loggedIn) {
        setUser({
          isLoggedIn: true,
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          role: response.data.role,
        });
      }
    } catch (error) {
      console.error("Session check failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = (data) => {
    setUser({
      isLoggedIn: true,
      firstName: data.first_name,
      lastName: data.last_name,
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
        firstName: "",
        lastName: "",
        role: "",
      });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
