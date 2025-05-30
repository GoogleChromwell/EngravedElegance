import React, { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
export default function CartCard() {
  const [quantity, setQuantity] = useState(1);

  const onAdd = (e) => {
    e.preventDefault(); 
    setQuantity(quantity + 1)
  };

  const onSubtract = (e) => {
    e.preventDefault(); 
    if(quantity <= 1){

    }
    else{
      setQuantity(quantity - 1)
    }
    
  };
  return (
    <div
      className="
      flex gap-7 rounded-custom-xs
      bg-white border border-primary-dark border-opacity-30 w-full p-3"
    >
      <div className="w-[45%] h-full border border-primary-dark border-opacity-30"></div>
      <div className="flex flex-col justify-between w-full rounded-custom-xs">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between text-[16px] font-bold">
            <h1> Wooden Coaster </h1>
            <h1> ₱100 </h1>
          </div>

          <div className="flex items-center text-[12px] font-medium gap-1">
            <label htmlFor="name" className="min-w-[40px]">
              Name:
            </label>
            <input
              id="name"
              type="text"
              className="
              border-b border-primary-dark 
              outline-none 
              bg-transparent 
              w-[35%] 
              text-[12px]"
            />
          </div>

          <div className="flex gap-2 items-center font-medium text-[12px]">
            <p>Color: </p>

            <label className="relative">
              <input
                type="radio"
                name="colors"
                value="red"
                className="peer hidden"
              />
              <div className="w-5 h-5 rounded-full bg-red-400 peer-checked:bg-red-800 cursor-pointer border shadow"></div>
            </label>

            <label className="relative">
              <input
                type="radio"
                name="colors"
                value="blue"
                className="peer hidden"
              />
              <div className="w-5 h-5 rounded-full bg-blue-400 peer-checked:bg-blue-800 cursor-pointer border shadow"></div>
            </label>

            <label className="relative">
              <input
                type="radio"
                name="colors"
                value="orange"
                className="peer hidden"
              />
              <div className="w-5 h-5 rounded-full bg-orange-400 peer-checked:bg-orange-800 cursor-pointer border shadow"></div>
            </label>

            <label className="relative">
              <input
                type="radio"
                name="colors"
                value="yellow"
                className="peer hidden"
              />
              <div className="w-5 h-5 rounded-full bg-yellow-400 peer-checked:bg-yellow-800 cursor-pointer border shadow"></div>
            </label>

            <label className="relative">
              <input
                type="radio"
                name="colors"
                value="green"
                className="peer hidden"
              />
              <div className="w-5 h-5 rounded-full bg-green-400 peer-checked:bg-green-800 cursor-pointer border shadow"></div>
            </label>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <button 
            onClick={onSubtract}>
              <RemoveIcon
                style={{ fontSize: "20px" }}
                className="border border-primary-dark border-opacity-30 rounded-custom-xs hover:bg-primary-dark hover:bg-opacity-15"
              />
            </button>

            <h1 className="text-[16px] pt-1">{quantity}</h1>

            <button
            onClick={onAdd}>
              <AddIcon

                style={{ fontSize: "20px" }}
                className="border border-primary-dark border-opacity-30 rounded-custom-xs hover:bg-primary-dark hover:bg-opacity-15"
              />
            </button>
          </div>
          <button>
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
