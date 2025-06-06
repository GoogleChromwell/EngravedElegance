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
    <div className="flex flex-col bg-primary-dark w-fit h-full min-h-screen p-[10px] gap-[16px] sticky top-0">
      <div className="flex place-items-center gap-2">
        <img src="../public/revised.png" alt="logo" className="size-[32px]" />
        <h1
          className="text-white font-poppins text-[12px] font-medium
                  custom-mobileSmall:hidden
                  custom-tablet:block"
        >
          Engraved Elegance
        </h1>
      </div>

      <div className="flex flex-col gap-[5px] place-items-center w-full">
        <NavLink to="/" className={({ isActive }) => navLinkStyle(isActive)}>
          <HomeOutlinedIcon style={{ fontSize: "24px" }} />
          <span
            className="pt-0.5
                    custom-mobileSmall:hidden
                    custom-tablet:block"
          >
            {" "}
            Home{" "}
          </span>
        </NavLink>

        {user.role === "admin" && (
          <>
            <NavLink
              to="/Dashboard"
              className={({ isActive }) => navLinkStyle(isActive)}
            >
              <DashboardOutlinedIcon style={{ fontSize: "24px" }} />
              <span
                className="pt-0.5
                        custom-mobileSmall:hidden
                        custom-tablet:block"
              >
                Dashboard
              </span>
            </NavLink>
            <NavLink
              to="/Staff"
              className={({ isActive }) => navLinkStyle(isActive)}
            >
              <PersonOutlineOutlinedIcon style={{ fontSize: "24px" }} />
              <span
                className="pt-0.5
                        custom-mobileSmall:hidden
                        custom-tablet:block"
              >
                Staff
              </span>
            </NavLink>
          </>
        )}

        {user.role === "staff" && (
          <NavLink
            to="/Cart"
            className={({ isActive }) => navLinkStyle(isActive)}
          >
            <div className="relative">
              <ShoppingCartOutlinedIcon style={{ fontSize: "24px" }} />
              <span
                className="
                absolute -top-2 -right-2
                bg-red-600 text-white rounded-full 
                flex items-center justify-center
                custom-tablet:w-[18px] custom-tablet:h-[18px] custom-tablet:text-[11px]
                custom-mobileSmall:w-[14px] custom-mobileSmall:h-[14px] custom-mobileSmall:text-[9px]"
              >
                {cartProducts}
              </span>
            </div>

            <span
              className="pt-0.5
              custom-mobileSmall:hidden
              custom-tablet:block"
            >
              Cart
            </span>
          </NavLink>
        )}
      </div>
    </div>
  );
}
