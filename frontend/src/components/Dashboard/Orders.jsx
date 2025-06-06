import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/Dashboard/DisplayOrders.php"
      )
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div className="flex flex-col bg-white w-full border h-full border-primary-dark border-opacity-30 shadow-md p-4 text-primary-dark">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold
        custom-tablet:text-[16px]
        custom-mobileSmall:text-[14px]">Orders</h1>
      </div>

      <div className="overflow-x-auto ">
        <table className="table-auto w-full text-center font-poppins">
          <thead className="border-b border-primary-dark border-opacity-30 font-semibold
          custom-laptop:text-[12px]
          custom-mobileSmall:text-[10px]">
            <tr>
              <th className="px-3">ID</th>
              <th className="px-7">Customer Name</th>
              <th className="px-7">Product Name</th>
              <th className="px-7">Total Price</th>
              <th>Quantity</th>
              <th className="px-7">Date Ordered</th>
            </tr>
          </thead>

          <tbody 
          className="font-medium
          custom-mobileSmall:text-[10px]">
            {orders.map((order) =>
              order.items.map((item, index) => (
                <tr
                  key={`${order.order_id}-${index}`}
                  className={
                    index === order.items.length - 1
                      ? "border-b border-primary-dark border-opacity-30"
                      : ""
                  }
                >
                  {index === 0 && (
                    <>
                      <td rowSpan={order.items.length}>{order.order_id}</td>
                      <td rowSpan={order.items.length}>
                        {order.customer_name}
                      </td>
                    </>
                  )}
                  <td>{item.product_name} <br /></td>
                  <td>
                    {index === 0 &&
                      Number(order.total_price).toLocaleString("en-PH", {
                        style: "currency",
                        currency: "PHP",
                      })}
                  </td>
                  <td>{item.quantity}</td>
                  <td>
                    {index === 0 &&
                      new Date(order.order_date).toLocaleDateString("en-PH", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
