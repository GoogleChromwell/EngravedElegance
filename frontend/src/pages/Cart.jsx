import React from "react";
import Sidebar from "../components/Navigation/Sidebar";
import Layout from "../components/Layout/Layout";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CartCard from "../components/CartItem/CartCard";
import CartSummary from "../components/CartItem/CartSummary";
import CartProducts from "../components/CartItem/CartProducts"
import { ToastContainer } from "react-toastify";
export default function Carts() {
  return (
    <Layout>
      <ToastContainer/>
      <div className="flex gap-3 w-full p-5">
        <CartProducts/>
        <CartSummary/>
      </div>
    </Layout>
  );
}
