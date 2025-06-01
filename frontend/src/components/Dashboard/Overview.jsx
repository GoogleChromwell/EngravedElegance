import React, { useState, useEffect } from "react";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import axios from "axios";
import Chart from "./Chart";

export default function Overview() {
  const [sales, setSales] = useState(0);
  const [orders, setOrders] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    axios
      .get(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/Dashboard/GetUsers.php"
      )
      .then((response) => {
        setUsers(response.data.Users);
      })
      .catch((error) => {
        console.log("Error fetching products: ", error);
      });
  }, []);

  const [selectedDate, setSelectedDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0]; // Ensures yyyy-mm-dd
  };

  useEffect(() => {
    const formatted = formatDate(selectedDate);

    axios
      .get(
        `http://localhost/Engraved-Clone/EngravedElegance/backend/Dashboard/Revenue.php?date=${formatted}`
      )
      .then((res) => {
        const data = res.data;
        console.log("Fetching revenue for:", formatDate(selectedDate));

        setSales(Number(data?.Sales || 0));
        setOrders(Number(data?.Orders || 0));
        setEarnings(Number(data?.Earnings || 0));
      })
      .catch((err) => console.error("Error fetching revenue:", err));
  }, [selectedDate]);

  return (
    <div className="flex w-full h-fit justify-between gap-2 font-semibold text-[16px] text-primary-dark">
      <div className="flex flex-col justify-between w-full font-bold p-3 border bg-white border-primary-dark border-opacity-30 rounded-custom-xs">
        <div className="flex justify-between items-center">
          <h1>Revenue</h1>
          <input
            type="date"
            className="text-[10px] border border-primary-dark p-1"
            value={selectedDate}
            onChange={(e) => setSelectedDate(formatDate(e.target.value))}
          />
        </div>
        <div className="flex justify-between items-center">
          {Number(earnings).toLocaleString("en-PH", {
            style: "currency",
            currency: "PHP",
          })}
          <div className="flex gap-5">
            <div className="flex items-center gap-1">
              <div className="bg-green-600 size-[14px] rounded-custom-xs"></div>
              <p className="text-[12px]">Total Earnings</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="bg-blue-600 size-[14px] rounded-custom-xs"></div>
              <p className="text-[12px]">Total Sales</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="bg-orange-600 size-[14px] rounded-custom-xs"></div>
              <p className="text-[12px]">Total Orders</p>
            </div>
          </div>
        </div>

        <div>
          <Chart />
        </div>
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
              <p className="text-[12px]">*30% of total sales</p>
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
              <p className="text-[12px]">*Total orders placed</p>
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
              <h1 className="text-[16px]">{users}</h1>
              <p className="text-[12px]">*Registered users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
