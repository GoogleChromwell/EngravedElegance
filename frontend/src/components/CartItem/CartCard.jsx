import React, { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";

export default function CartCard({ cart_id, product_name, quantity, price }) {
  const [cartQuantity, setQuantity] = useState(Number(quantity) || 1);

  const onDelete = () => {
    axios
      .post(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/DeleteCartProduct.php",
        { cart_id: cart_id }, 
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => window.location.reload())
      .catch((err) => console.error("Delete failed", err));
  };

  const updateQuantity = (newQuantity) => {
    axios
      .put(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/UpdateCartQuantity.php",
        {
          cart_id,
          quantity: newQuantity,
        }
      )
      .then((res) => {
        console.log("Quantity updated");
      })
      .catch((err) => {
        console.error("Update failed", err);
      });
  };

  const onAdd = (e) => {
    e.preventDefault();
    const newQuantity = cartQuantity + 1;
    axios
      .put(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/UpdateCartQuantity.php",
        {
          cart_id,
          quantity: newQuantity,
        }
      )
      .then((res) => {
        window.location.reload(); // ⬅ reload the page after successful update
      })
      .catch((err) => {
        console.error("Update failed", err);
      });
  };

  const onSubtract = (e) => {
    e.preventDefault();
    if (cartQuantity > 1) {
      const newQuantity = cartQuantity - 1;
      axios
        .put(
          "http://localhost/Engraved-Clone/EngravedElegance/backend/UpdateCartQuantity.php",
          {
            cart_id,
            quantity: newQuantity,
          }
        )
        .then((res) => {
          window.location.reload(); // ⬅ reload here too
        })
        .catch((err) => {
          console.error("Update failed", err);
        });
    }
  };

  const colorClasses = {
    red: "bg-red-400 peer-checked:bg-red-800",
    blue: "bg-blue-400 peer-checked:bg-blue-800",
    orange: "bg-orange-400 peer-checked:bg-orange-800",
    yellow: "bg-yellow-400 peer-checked:bg-yellow-800",
    green: "bg-green-400 peer-checked:bg-green-800",
  };

  return (
    <div className="flex gap-7 rounded-custom-xs text-primary-dark bg-white border border-primary-dark border-opacity-30 w-full p-3">
      <div className="w-[45%] h-full border border-primary-dark border-opacity-30"></div>

      <div className="flex flex-col justify-between w-full rounded-custom-xs gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between text-[16px] font-bold">
            <h1>{product_name}</h1>
            <h1>₱{price}</h1>
          </div>

          <div className="flex items-center text-[12px] font-medium gap-1">
            <label htmlFor="name" className="min-w-[40px]">
              Name:
            </label>
            <input
              id="name"
              type="text"
              className="border-b border-primary-dark outline-none w-[35%] text-[12px]"
            />
          </div>

          <div className="flex gap-2 items-center font-medium text-[12px]">
            <p>Color:</p>
            {Object.keys(colorClasses).map((color) => (
              <label className="relative" key={color}>
                <input
                  type="radio"
                  name={`color-${product_name}`}
                  value={color}
                  className="peer hidden"
                />
                <div
                  className={`w-5 h-5 rounded-full ${colorClasses[color]} cursor-pointer border shadow`}
                ></div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <button onClick={onSubtract}>
              <RemoveIcon
                style={{ fontSize: "20px" }}
                className="border border-primary-dark border-opacity-30 rounded-custom-xs hover:bg-primary-dark hover:bg-opacity-15"
              />
            </button>

            <h1 className="text-[16px] pt-1">{cartQuantity}</h1>

            <button onClick={onAdd}>
              <AddIcon
                style={{ fontSize: "20px" }}
                className="border border-primary-dark border-opacity-30 rounded-custom-xs hover:bg-primary-dark hover:bg-opacity-15"
              />
            </button>
          </div>

          <button onClick={onDelete}>
            <DeleteOutlineOutlinedIcon
              style={{ fontSize: "24px" }}
              className="hover:text-red-800"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
