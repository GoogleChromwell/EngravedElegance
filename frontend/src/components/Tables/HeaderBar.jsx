import React, { useContext } from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { toast } from "react-toastify";
import { UserContext } from "../Authentication/UserContext";

export default function HeaderBar({ onLoginClick }) {
  
  const { user, logout } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex h-fit w-full bg-primary-light justify-end items-center p-[16px] border-b-[0.1px] border-custom-gray border-opacity-50">
      <div className="flex justify-end items-center gap-[14px]">
        <div className="flex items-center gap-[10px]">
                    {user.isLoggedIn && (
            <div className="flex items-center gap-2">
              <div className="flex justify-center border border-primary-dark border-opacity-30 rounded-full size-10 items-center bg-white">
                <PersonOutlineOutlinedIcon
                  style={{ fontSize: "32px", textAlign: "center" }}
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-[14px] font-semibold"> {user.firstName} {user.lastName}</h1>
                <p className="text-[10px] font-medium"> {user.role} </p>
              </div>
              <KeyboardArrowDownOutlinedIcon style={{ fontSize: "20px" }} />
            </div>
          )}
          {!user.isLoggedIn ? (
            <button
              onClick={onLoginClick}
              className="text-[12px] text-white bg-primary-dark font-semibold p-2 rounded-custom-xs w-20"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className=" text-[12px] text-white bg-primary-dark font-semibold p-2 rounded-custom-xs w-20"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
