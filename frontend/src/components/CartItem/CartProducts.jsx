import React, { useEffect, useState } from "react";
import CartCard from "./CartCard";
import axios from "axios";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/Cart/DisplayCart.php"
      )
      .then((res) => {
        console.log("Fetched cart items:", res.data);
        setCartItems(res.data);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full">
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CartCard
            key={item.cart_id}
            cart_id={item.cart_id}
            product_description={item.product_description}
            product_name={item.product_name}
            price={item.price}
            quantity={item.cart_quantity}
            image={item.image}
          /> 
        ))
      ) : (
        <div className="text-center text-[16px] font-bold">
          🛒 Your cart is empty. Add some products!
        </div>
      )}
    </div>
  );
}
