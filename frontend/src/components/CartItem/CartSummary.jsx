import React from "react";

export default function CartSummary() {
  return (
    <div
      className="
    flex flex-col p-3 gap-5
    bg-white border border-primary-dark border-opacity-30 w-full"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-[16px] font-bold">Summary</h1>

        <div className="flex flex-col gap-2 text-[12px] font-medium">
          <div className="flex justify-between">
            <p>Subtotal: </p>
            <p> ₱0 </p>
          </div>

          <div className="flex justify-between">
            <p>Promo Discount: </p>
            <p> ₱0 </p>
          </div>

          <div className="flex justify-between text-[16px] font-bold">
            <p>Total: </p>
            <p> ₱0 </p>
          </div>
        </div>
      </div>

      <button className="bg-primary-dark text-white p-[5px] rounded-custom-xs text-[14px]">
        Place Order
      </button>
    </div>
  );
}
