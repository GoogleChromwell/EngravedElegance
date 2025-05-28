import React from "react";

export default function ProductCard() {
  return (
    <div
      className="
    w-fit h-fit p-[10px] bg-white border border-primary-dark border-opacity-30 flex flex-col
    font-poppins gap-2"
    >
      <div className="border border-primary-dark border-opacity-20 w-full h-36 "></div>

      <h2 className="text-[14px] font-medium">Wooden Coaster</h2>
      <p className="text-[12px] w-44">
        Circular wooden engraving available in plain or colored design.
      </p>

      <div className="flex items-center justify-between">
        <h1 className="text-[16px] font-semibold">₱50.00</h1>
        <div className="border border-primary-dark border-opacity-15 rounded-custom-xs p-[4px]">
            <p className="text-[10px] font-medium">100 Items</p>
        </div>
      </div>

      <button className="bg-primary-dark text-[12px] text-white font-medium p-[6px] rounded-custom-xs">
        Add to Cart
      </button>
    </div>
  );
}
