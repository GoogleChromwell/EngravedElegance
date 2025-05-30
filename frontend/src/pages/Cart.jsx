import React from "react";
import Sidebar from "../components/Navigation/Sidebar";
import Layout from "../components/Layout/Layout";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CartCard from "../components/CartItem/CartCard";
export default function Carts() {
  return (
    <Layout>
      <div className="justify-between flex p-5 gap-3">
        <div className="flex flex-col gap-3 w-full">
           <CartCard /> 
           <CartCard />
           <CartCard />
           <CartCard />
           <CartCard />
          </div>
        <div className=" w-[50%] border border-primary-dark border-opacity-30 p-3 font-poppins h-fit ">
          <h1 className="font-bold text-[16px]">Summary</h1>
          <div className=" flex text-[14px] justify-between gap-1  mt-2">
            <p>Subtotal :</p>
            <p>₱200</p>
          </div>

          <div className=" flex text-[14px] justify-between gap-1  mt-2">
            <p>Promo Discount : </p>
            <p>-10</p>
          </div>

          <div className=" flex text-[16px] justify-between gap-1  mt-2 font-bold">
            <p>Total :</p>
            <p>₱10</p>
          </div>
          <div>
            <button class="bg-primary-dark text-[14px] text-white font-medium p-[6px] rounded-custom-xs mt-2 w-full">
              Place Order
            </button>
          </div>
        </div>
      </div>
      
    </Layout>
  );
}
