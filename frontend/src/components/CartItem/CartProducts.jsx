import React, { useEffect, useState } from "react";
import CartCard from "./CartCard";
import axios from "axios";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/DisplayCart.php"
      )
      .then((res) => {
        console.log("Fetched cart items:", res.data); // should now be an array
        setCartItems(res.data);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full">
      {cartItems.map((item) => (
        <CartCard
          key={item.cart_id}
          cart_id={item.cart_id} // <- now passing cart ID
          product_name={item.product_name}
          price={item.price}
          quantity={item.cart_quantity}
        />
      ))}
    </div>
  );
}
