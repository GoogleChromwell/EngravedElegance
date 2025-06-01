// HeaderBar.jsx
import React, { useEffect, useState } from "react";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import axios from "axios";

export default function HeaderBar({ onLoginClick }) {
  const [Username, setUsername] = useState("");
  const [Status, setStatus] = useState("");

  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/Authentication/Logout.php",
        {},
        {
          withCredentials: true, // 🔐 Important for session-based logout
        }
      );

      console.log("Logout success:", response.data);
      toast.success("Logged out successfully");

      // 🔄 Optional: Redirect or update state
      // navigate("/login"); // if you're using react-router
      // setUser(null);      // clear current user in state
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/Authentication/GetSessionData.php",
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.loggedIn) {
          setUsername(response.data.username);
          setStatus(true);
        }
      })
      .catch((error) => {
        console.log("Session Failed: ", error);
      });
  }, []);
  return (
    <div className="flex h-fit w-full bg-primary-light justify-end items-center p-[16px] border-b-[0.1px] border-custom-gray border-opacity-50">
      <div className="flex justify-end items-center gap-[14px]">
        <div className="flex items-center gap-[10px]">
          <div>
            <button
              onClick={onLoginClick}
              className="text-[12px] text-white bg-primary-dark font-semibold p-3 rounded-custom-xs w-20"
            >
              Login
            </button>
          </div>

          <div>
            <button
              onClick={logout}
              className="text-[12px] text-white bg-primary-dark font-semibold p-3 rounded-custom-xs w-20"
            >
              Logout
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex justify-center border border-primary-dark border-opacity-30 rounded-full size-10 items-center bg-white">
              <PersonOutlineOutlinedIcon
                style={{ fontSize: "32px", textAlign: "center" }}
              />
            </div>

            <div className="flex flex-col">
              <h1 className="text-[14px] font-semibold"> {Username} </h1>
              <p className="text-[10px] font-medium"> Admin </p>
            </div>
            <KeyboardArrowDownOutlinedIcon style={{ fontSize: "20px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
