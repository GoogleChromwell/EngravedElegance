import React from "react";
import { Link, NavLink } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

export default function Sidebar() {
  return (
    <div className="flex flex-col bg-primary-dark w-fit min-h-screen p-[8px] gap-[16px]">
      <div className="flex place-items-center gap-2">
        <img src="../public/revised.png" alt="" className="size-[28px]" />
        <h1 className="text-white font-poppins text-[12px] font-medium">
          Engraved Elegance
        </h1>
      </div>

      <div className="flex flex-col gap-[5px] place-items-center">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `flex place-items-center gap-[5px] w-full p-[5px]
            font-poppins text-[10px] font-light text-white rounded-custom-xs
            ${isActive ? 'bg-custom-gray bg-opacity-30': 'bg-opacity-0'}`}
        >
          <HomeOutlinedIcon style={{ fontSize: "18px" }} />
          <span className="pt-0.5"> Home </span>
        </NavLink>

        <NavLink
          to={"/Dashboard"}
          className={({ isActive }) =>
            `flex place-items-center gap-[5px] w-full p-[5px]
            font-poppins text-[10px] font-light text-white rounded-custom-xs
            ${isActive ? 'bg-custom-gray bg-opacity-30': 'bg-opacity-0'}`}
        >
          <DashboardOutlinedIcon style={{ fontSize: "18px" }} />
          Dashboard
        </NavLink>

        <NavLink
          to={"/Cart"}
          className={({ isActive }) =>
            `flex place-items-center gap-[5px] w-full p-[5px]
            font-poppins text-[10px] font-light text-white rounded-custom-xs
            ${isActive ? 'bg-custom-gray bg-opacity-30': 'bg-opacity-0'}`}
        >
          <ShoppingCartOutlinedIcon style={{ fontSize: "18px" }} />
          Cart
        </NavLink>

        <NavLink
          to={"/Orders"}
          className={({ isActive }) =>
            `flex place-items-center gap-[5px] w-full p-[5px]
            font-poppins text-[10px] font-light text-white rounded-custom-xs
            ${isActive ? 'bg-custom-gray bg-opacity-30': 'bg-opacity-0'}`}
        >
          <Inventory2OutlinedIcon style={{ fontSize: "18px" }} />
          Orders
        </NavLink>

        <hr className="w-full" />

        <h1
          className="w-full pl-[5px]
                    text-white text-left font-poppins text-[10px] font-medium"
        >
          User Management
        </h1>

        <NavLink
          to={"/Customer"}
          className={({ isActive }) =>
            `flex place-items-center gap-[5px] w-full p-[5px]
            font-poppins text-[10px] font-light text-white rounded-custom-xs
            ${isActive ? 'bg-custom-gray bg-opacity-30': 'bg-opacity-0'}`}
        >
          <PersonOutlineOutlinedIcon style={{ fontSize: "20px" }} />
          <span className="pt-0.5"> Customer </span>
        </NavLink>

        <NavLink
          to={"/Staff"}
          className={({ isActive }) =>
            `flex place-items-center gap-[5px] w-full p-[5px]
            font-poppins text-[10px] font-light text-white rounded-custom-xs
            ${isActive ? 'bg-custom-gray bg-opacity-30': 'bg-opacity-0'}`}
        >
          <PersonOutlineOutlinedIcon style={{ fontSize: "20px" }} />
          <span className="pt-0.5"> Staff</span>
        </NavLink>
      </div>
    </div>
  );
}
