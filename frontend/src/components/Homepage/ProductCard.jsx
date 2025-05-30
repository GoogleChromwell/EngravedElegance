import React from "react";

export default function ProductCard({ name, description, price, quantity }) {
  return (
    <div
      className="
    w-52  p-[10px] bg-white border border-primary-dark border-opacity-30 flex flex-col
    font-poppins justify-between"
    >
      <div className="flex flex-col gap-2">
        <div className="border border-primary-dark border-opacity-20 w-full h-36 "></div>
        <div>
          <h2 className="text-[14px] font-medium">{name}</h2>
          <p className="text-[10px] w-44">{description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-[16px] font-semibold">₱{price}</h1>
          <div className="border border-primary-dark border-opacity-15 rounded-custom-xs p-[4px]">
            <p className="text-[10px] font-medium">{quantity} items</p>
          </div>
        </div>

        <button className="bg-primary-dark text-[12px] text-white font-medium p-[6px] rounded-custom-xs">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
