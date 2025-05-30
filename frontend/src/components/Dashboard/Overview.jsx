import React, { useState, useEffect } from "react";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import axios from "axios";

export default function Overview() {
  const [sales, setSales] = useState(0);
  const [orders, setOrders] = useState(0);
  const [earnings, setEarnings] = useState(0);
  useEffect(() => {
    axios
      .get(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/Dashboard/Revenue.php"
      )
      .then((res) => {
        const data = res.data[0]; // only one row
        setSales(Number(data?.Sales || 0));
        setOrders(Number(data?.Orders || 0));
        setEarnings(Number(data?.Earnings || 0))
        // If you add earnings in PHP
        // setEarnings(Number(data?.Earnings || 0));
      })
      .catch((err) => console.error("Error fetching totals:", err));
  }, []);

  return (
    <div className="flex w-full h-fit justify-between gap-2 font-semibold text-[16px] text-primary-dark">
      <div className=" w-full font-bold p-3 border bg-white border-primary-dark border-opacity-30 rounded-custom-xs">
        Revenue
      </div>

      <div
        className="
      w-full rounded-custom-xs h-full
      grid grid-cols-2 gap-3 "
      >
        <div className="border border-primary-dark border-opacity-30 bg-white p-3">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="font-bold">Sales</h1>
              <AttachMoneyOutlinedIcon
                style={{ fontSize: "36px" }}
                className="text-black border border-primary-dark border-opacity-30 rounded-custom-xs p-1"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-[16px]">
                {Number(sales).toLocaleString("en-PH", {
                  style: "currency",
                  currency: "PHP",
                })}
              </h1>

              <p className="text-[12px]">*Total daily sales</p>
            </div>
          </div>
        </div>

        <div className="border border-primary-dark border-opacity-30 bg-white p-3">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="font-bold">Earnings</h1>
              <TrendingUpOutlinedIcon
                style={{ fontSize: "36px" }}
                className="text-black border border-primary-dark border-opacity-30 rounded-custom-xs p-1"
              />
            </div>
            <div className="flex flex-col gap-4">
              {Number(earnings).toLocaleString("en-PH", {
                  style: "currency",
                  currency: "PHP",
                })}
              <p className="text-[12px]">*Total daily orders</p>
            </div>
          </div>
        </div>

        <div className="border border-primary-dark border-opacity-30 bg-white p-3">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="font-bold">Orders</h1>
              <ReceiptLongOutlinedIcon
                style={{ fontSize: "36px" }}
                className="text-black border border-primary-dark border-opacity-30 rounded-custom-xs p-1"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-[16px]">{orders}</h1>
              <p className="text-[12px]">*Total daily orders</p>
            </div>
          </div>
        </div>

        <div className="border border-primary-dark border-opacity-30 bg-white p-3">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="font-bold">Users</h1>
              <PersonOutlineOutlinedIcon
                style={{ fontSize: "36px" }}
                className="text-black border border-primary-dark border-opacity-30 rounded-custom-xs p-1"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-[16px]">5</h1>
              <p className="text-[12px]">*Total registered users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
