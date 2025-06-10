import React, { useContext } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { toast } from "react-toastify";
import { UserContext } from "../Authentication/UserContext";
import LogoutIcon from "@mui/icons-material/Logout";

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
    <div className="flex h-fit w-full bg-primary-light justify-between p-[16px] border-b-[0.1px] border-custom-gray border-opacity-50">
      <div className="flex items-center justify-between w-full">
        {user.isLoggedIn && (
          <div className="flex items-center gap-2 ">
            <div className="flex justify-center border border-primary-dark border-opacity-30 rounded-full size-10 items-center bg-white">
              <PersonOutlineOutlinedIcon
                style={{ fontSize: "32px", textAlign: "center" }}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-[14px] font-semibold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-[10px] font-medium"> {user.role} </p>
            </div>
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
            className="flex justify-between  items-center text-[12px] font-semibold bg-primary-dark text-white rounded-custom-xs p-2 size-fit
            custom-mobileSmall:w-fit
            custom-mobileMedium:w-20"
          >
            <span 
            className="custom-mobileSmall:hidden
                      custom-mobileMedium:block">
              Logout
            </span>
            <LogoutIcon style={{ fontSize: "16px" }} />
          </button>
        )}
      </div>
    </div>
  );
}
