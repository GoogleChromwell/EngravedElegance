import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Authentication/UserContext"; 

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

export default function Sidebar() {
  const { user } = useContext(UserContext);
  const [cartProducts, setCartProducts] = useState(0);

  useEffect(() => {
    if (user.role === "staff") {
      axios
        .get(
          "http://localhost/Engraved-Clone/EngravedElegance/backend/Cart/CountCart.php"
        )
        .then((response) => {
          setCartProducts(response.data.cart_count ?? 0);
        })
        .catch((error) => {
          console.error("Error fetching cart products: ", error);
        });
    }
  }, [user.role]);

  const navLinkStyle = (isActive) =>
    `flex place-items-center gap-[5px] w-full p-[5px]
     font-poppins text-[12px] font-medium text-white rounded-custom-xs
     ${isActive ? "bg-custom-gray bg-opacity-30" : "bg-opacity-0"}`;

  return (
    <div className="flex flex-col bg-primary-dark w-fit h-screen p-[10px] gap-[16px] sticky top-0">
      <div className="flex place-items-center gap-2">
        <img src="../public/revised.png" alt="logo" className="size-[32px]" />
        <h1 className="text-white font-poppins text-[12px] font-medium">
          Engraved Elegance
        </h1>
      </div>

      <div className="flex flex-col gap-[5px] place-items-center">
        <NavLink to="/" className={({ isActive }) => navLinkStyle(isActive)}>
          <HomeOutlinedIcon style={{ fontSize: "24px" }} />
          <span className="pt-0.5"> Home </span>
        </NavLink>

        {user.role === "admin" && (
          <>
            <NavLink
              to="/Dashboard"
              className={({ isActive }) => navLinkStyle(isActive)}
            >
              <DashboardOutlinedIcon style={{ fontSize: "24px" }} />
              <span className="pt-0.5"> Dashboard </span>
            </NavLink>
            <NavLink
              to="/Staff"
              className={({ isActive }) => navLinkStyle(isActive)}
            >
              <PersonOutlineOutlinedIcon style={{ fontSize: "24px" }} />
              <span className="pt-0.5"> Staff </span>
            </NavLink>
          </>
        )}

        {user.role === "staff" && (
          <NavLink
            to="/Cart"
            className={({ isActive }) => navLinkStyle(isActive)}
          >
            <ShoppingCartOutlinedIcon style={{ fontSize: "24px" }} />
            <div className="flex justify-between w-full">
              <h1>Cart</h1>
              <p className="bg-red-600 size-[19px] text-center text-[13px] rounded-full">
                {cartProducts}
              </p>
            </div>
          </NavLink>
        )}
      </div>
    </div>
  );
}
