import React from "react";
import Layout from "../components/Layout/Layout";
import CartSummary from "../components/CartItem/CartSummary";
import CartProducts from "../components/CartItem/CartProducts";
export default function Carts() {
  return (
    <Layout>
      <div
        className="
      custom-laptopMedium:flex gap-3 w-full p-5
      custom-mobileSmall:grid custom-mobileSmall:grid-cols-1"
      >
        <CartProducts />
        <CartSummary />
      </div>
    </Layout>
  );
}
