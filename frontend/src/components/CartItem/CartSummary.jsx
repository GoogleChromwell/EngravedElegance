import { useEffect, useState } from "react";
import axios from "axios";

export default function CartSummary() {
  const [cartTotal, setCartTotal] = useState(0);
  useEffect(() => {
    axios
      .get(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/CartTotal.php"
      )
      .then((res) => {
        const total = parseFloat(res.data[0]?.total_cart_value) || 0;
        setCartTotal(total);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  return (
    <div
      className="
    flex flex-col p-3 gap-5 text-primary-dark h-fit
    bg-white border border-primary-dark border-opacity-30 w-full"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-[16px] font-bold">Summary</h1>

        <div className="flex flex-col gap-2 text-[12px] font-medium">
          <div className="flex justify-between">
            <p>Subtotal: </p>
           <p>{Number(cartTotal).toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })}</p>

          </div>

          <div className="flex justify-between">
            <p>Promo Discount: </p>
            <p> ₱0 </p>
          </div>

          <div className="flex justify-between text-[16px] font-bold">
            <p>Total: </p>
            <p>{Number(cartTotal).toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })}</p>

          </div>
        </div>
      </div>

      <button className="bg-primary-dark text-white p-[5px] rounded-custom-xs text-[14px]">
        Place Order
      </button>
    </div>
  );
}
