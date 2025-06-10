import React, { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";

export default function CartCard({ cart_id, product_name, product_description, quantity, price, image }) {
  const [cartQuantity, setQuantity] = useState(Number(quantity) || 1);

  const onDelete = () => {
    axios
      .post(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/Cart/DeleteCartProduct.php",
        { cart_id: cart_id }, 
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => window.location.reload())
      .catch((err) => console.error("Delete failed", err));
  };

  const updateQuantity = (newQuantity) => {
    axios
      .put(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/Cart/UpdateCartQuantity.php",
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
        "http://localhost/Engraved-Clone/EngravedElegance/backend/Cart/UpdateCartQuantity.php",
        {
          cart_id,
          quantity: newQuantity,
        }
      )
      .then((res) => {
        window.location.reload();
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
          "http://localhost/Engraved-Clone/EngravedElegance/backend/Cart/UpdateCartQuantity.php",
          {
            cart_id,
            quantity: newQuantity,
          }
        )
        .then((res) => {
          window.location.reload();
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
    <div className="gap-3 rounded-custom-xs text-primary-dark bg-white border border-primary-dark border-opacity-30 w-full p-3
    custom-tablet:flex 
    custom-mobileSmall:grid custom-mobileSmall:grid-cols-1">
      <img src={`../public/Products/${image}`} className=" border border-primary-dark border-opacity-30
      custom-tablet:w-64 custom-tablet:h-full
      custom-mobileSmall:size-full custom-mobileSmall:h-full">
        
      </img>

      <div className="flex flex-col justify-between w-full rounded-custom-xs gap-4">
        <div className="flex flex-col gap-3">
          <div 
          className="flex justify-between font-bold text-[16px]">
            <h1>{product_name}</h1>
            <h1>₱{price}</h1>
          </div>

          <div 
          className="font-medium text-[12px]">
            <p>{product_description}</p>
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
