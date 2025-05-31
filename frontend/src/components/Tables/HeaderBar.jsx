// HeaderBar.jsx
import React from "react";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

export default function HeaderBar({ onLoginClick }) {
  return (
    <div className="flex h-fit w-full bg-primary-light justify-end items-center p-[16px] border-b-[0.1px] border-custom-gray border-opacity-50">
      <div className="flex justify-end items-center gap-[14px]">
        <button className="p-[8px] bg-white rounded-custom-xs shadow hover:bg-primary-dark hover:bg-opacity-10 border border-primary-dark border-opacity-20">
          <MessageOutlinedIcon style={{ fontSize: "20px" }} />
        </button>
        <button className="p-[8px] bg-white rounded-custom-xs shadow hover:bg-primary-dark hover:bg-opacity-10 border border-primary-dark border-opacity-20">
          <NotificationsOutlinedIcon style={{ fontSize: "20px" }} />
        </button>
        <div className="flex items-center gap-[10px]">
          <div>
            <button
              onClick={onLoginClick} // trigger modal
              className="text-[12px] text-white bg-primary-dark font-semibold p-3 rounded-custom-xs w-20"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
