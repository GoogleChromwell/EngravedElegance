import React, { useState, useEffect } from "react";
import axios from "axios";
import ProtectedRoute from "../Authentication/ProtectedRoute";
export default function ProductCard({
  productID,
  name,
  description,
  price,
  quantity,
  image
}) {
  const [cartButton, setCartButton] = useState("");

  useEffect(() => {
    if (quantity < 1) {
      setCartButton("Out of Stock");
    } else {
      setCartButton("Add to Cart");
    }
  }, [quantity]);

  const addToCart = async () => {
    try {
      await axios.post(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/Cart/AddToCart.php",
        {
          product_id: productID,
          quantity: 1,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      window.location.reload();
    } catch (error) {
      console.error("Add-to-cart error:", error);
      alert("Add to cart failed");
    }
  };

  return (
    <div
      className="
     p-[10px] bg-white border border-primary-dark border-opacity-30 flex flex-col
    font-poppins justify-between
    custom-tablet:w-52
    custom-mobileSmall:w-[200px]"
    
    >
      <div className="flex flex-col gap-2">
        <img src={`../public/Products/${image}`} className="border border-primary-dark border-opacity-20 w-full h-36 "></img>

        <div className="flex flex-col gap-1 mb-1 text-primary-dark">
          <h2 
            className="font-bold
            custom-tablet:text-[16px] 
            custom-mobileSmall:text-[14px]">
          {name}
          </h2>
          <p 
          className=" w-44
          custom-tablet:text-[12px]
          custom-mobileSmall:text-[10px]">
            {description}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 text-primary-dark">
        <div className="flex items-center justify-between">
          <h1 className="text-[16px] font-bold">₱{price}</h1>
          <div className="border border-primary-dark border-opacity-15 rounded-custom-xs p-[4px]">
            <p className="text-[10px] font-semibold">{quantity} items</p>
          </div>
        </div>
        <ProtectedRoute allowedRoles={"staff"}>
          <button
            onClick={addToCart}
            className={`text-[12px] font-medium p-[6px] rounded-custom-xs ${
              quantity < 1
                ? "bg-primary-dark bg-opacity-70 text-white"
                : "bg-primary-dark text-white"
            }`}
            disabled={quantity < 1}
          >
            {cartButton}
          </button>
        </ProtectedRoute>
      </div>
    </div>
  );
}
