import { useEffect, useState } from "react";
import axios from "axios";
import PlaceOrderModal from "../Modal/PlaceOrderModal";

export default function CartSummary() {
  const [cartTotal, setCartTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  

  const openModal = () => {
    setIsModalOpen(true);
  };

 const handlePlaceOrder = async () => {
  if (!customerName.trim()) {
    alert("Please enter a customer name.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost/Engraved-Clone/EngravedElegance/backend/Cart/PlaceOrder.php",
      {
        customer_name: customerName,
      }
    );

    if (response.data.message === "Order placed successfully") {
      alert("Order placed successfully!");
    } else {
      alert("Something went wrong while placing the order.");
    }

    setCustomerName("");
    setIsModalOpen(false);
    window.location.reload();
  } catch (error) {
    console.error("Order placement failed:", error);
    alert("Failed to place order.");
  }
};


  useEffect(() => {
    axios
      .get("http://localhost/Engraved-Clone/EngravedElegance/backend/Cart/CartTotal.php")
      .then((res) => {
        const total = parseFloat(res.data[0]?.total_cart_value) || 0;
        setCartTotal(total);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  return (
    <div className="flex flex-col p-3 gap-5 text-primary-dark h-fit bg-white border border-primary-dark border-opacity-30 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-[16px] font-bold">Summary</h1>

        <div className="flex flex-col gap-2 text-[12px] font-medium">
          <div className="flex justify-between">
            <p>Subtotal: </p>
            <p>{Number(cartTotal).toLocaleString("en-PH", { style: "currency", currency: "PHP" })}</p>
          </div>

          <div className="flex justify-between text-[16px] font-bold">
            <p>Total: </p>
            <p>{Number(cartTotal).toLocaleString("en-PH", { style: "currency", currency: "PHP" })}</p>
          </div>
        </div>
      </div>

      <button
        onClick={openModal}
        className="bg-primary-dark text-white p-[5px] rounded-custom-xs text-[14px]"
      >
        Place Order
      </button>

      <PlaceOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col gap-3">
          <h2 className="text-[14px] font-bold text-primary-dark">Enter Customer Name</h2>
        <input
          type="text"
          className="w-full p-2 text-[12px] border border-primary-dark border-opacity-30 rounded-custom-xs"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <button
          onClick={handlePlaceOrder}
          className="text-[12px] w-full font-medium bg-primary-dark text-white p-2 rounded-custom-xs"
        >
          Confirm Order
        </button>
        </div>
        
      </PlaceOrderModal>
    </div>
  );
}
