import React from 'react'
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
export default function CartCard() {
  return (
      <div className="flex gap-4 font-poppins w-full">
        <div className="gap-4 flex items-center justify-between w-full bg-white border border-primary-dark border-opacity-30 p-4 shadow-sm">
          {/* Sa pic to boi*/}
          <div className="w-36 h-36 bg-primary-light border border-gray-300"></div>

          <div className="flex flex-col flex-1  gap-1  w-full">
            <div className="flex justify-between">
              <p className="font-bold font-poppins text-[16px] w-full">
                Wooden Coaster
              </p>
            </div>

            <p className="font-poppins text-[14px] font-medium">Name:</p>
            <div className="flex gap-2 mt-1 items-center">
              <p className="text-[14px] font-medium">Color:</p>
              <label className="w-4 h-4 rounded-full bg-black cursor-pointer ">
                <input
                  type="radio"
                  name="color"
                  value="black"
                  className="opacity-0   cursor-pointer"
                />
              </label>

              <label className="w-4 h-4 rounded-full bg-red-600 cursor-pointer ">
                <input
                  type="radio"
                  name="color"
                  value="red"
                  className="opacity-0   cursor-pointer"
                />
              </label>

              <label className="w-4 h-4 rounded-full bg-blue-500 cursor-pointer ">
                <input
                  type="radio"
                  name="color"
                  value="blue"
                  className="opacity-0  cursor-pointer"
                />
              </label>

              <label className="w-4 h-4 rounded-full bg-yellow-400 cursor-pointer ">
                <input
                  type="radio"
                  name="color"
                  value="yellow"
                  className="opacity-0  cursor-pointer"
                />
              </label>
            </div>

            <div className="flex  mt-5 justify-between shadow-sm w-full">
              <div className="flex  gap-3 w-full justify-between">
                <div className="flex gap-3">
                  <button className="border border-primary-dark border-opacity-30  ">
                    <RemoveIcon
                      style={{ fontSize: "20px" }}
                      className=" opacity-80"
                    />
                  </button>
                  <span>{1}</span>
                  <button className="border border-primary-dark border-opacity-30">
                    <AddIcon
                      style={{ fontSize: "20px" }}
                      className="opacity-80"
                    />
                  </button>
                </div>

                <DeleteOutlinedIcon className="text-gray-600 hover:text-red-500 cursor-pointer " />
              </div>
            </div>
          </div>
        </div>
      </div>

  )
}
