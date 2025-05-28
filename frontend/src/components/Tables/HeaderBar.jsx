import React from "react";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

export default function HeaderBar() {
  return (
    <div className="flex h-fit w-full bg-primary-light justify-end items-center p-[16px] border-b-[0.1px] border-custom-gray border-opacity-50">
      <div className="flex justify-end items-center gap-[14px]">
        <button className="p-[8px] bg-white rounded-custom-xs shadow hover:bg-primary-dark hover:bg-opacity-10 border border-primary-dark border-opacity-20">
          <MessageOutlinedIcon style={{ fontSize: "20px" }} />
        </button>
        <button className="p-[8px] bg-white rounded-custom-xs shadow hover:bg-primary-dark hover:bg-opacity-10  border border-primary-dark border-opacity-20">
          <NotificationsOutlinedIcon style={{ fontSize: "20px" }} />
        </button>
        <div className="flex items-center gap-[10px]">
          <div className="p-5 rounded-full bg-gray-400" />
          <div className="text-[12px] text-left font-poppins">
            <h1 className="font-medium">Cromwell Naval</h1>
            <h2 className="text-[10px] text-primary-dark font-normal">Admin</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
