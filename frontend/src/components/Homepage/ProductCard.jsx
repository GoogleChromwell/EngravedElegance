import React from "react";
import axios from "axios";
export default function ProductCard({
  productID,
  name,
  description,
  price,
  quantity,
}) {
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
    w-52 p-[10px] bg-white border border-primary-dark border-opacity-30 flex flex-col
    font-poppins justify-between"
    >
      <div className="flex flex-col gap-2">
        <div className="border border-primary-dark border-opacity-20 w-full h-36 "></div>

      
        <div className="flex flex-col gap-1 mb-1">
          <h2 className="text-[16px] font-bold">{name}</h2>
          <p className="text-[12px] w-44">{description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h1 className="text-[16px] font-bold">₱{price}</h1>
          <div className="border border-primary-dark border-opacity-15 rounded-custom-xs p-[4px]">
            <p className="text-[10px] font-semibold">{quantity} items</p>
          </div>
        </div>

        <button
          onClick={addToCart}
          className="bg-primary-dark text-[12px] text-white font-medium p-[6px] rounded-custom-xs"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
