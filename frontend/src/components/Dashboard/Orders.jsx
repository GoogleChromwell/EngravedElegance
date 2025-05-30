import React from "react";

export default function Orders() {
  return (
    <div className="flex flex-col bg-white w-full border border-primary-dark border-opacity-30 shadow-md p-4 text-primary-dark h-full">
      <div className="flex justify-between items-center mb-5"> 
         <h1 className="text-[14px] font-bold">Recent Orders</h1>
         <select name="" id="" className="text-[12px] font-semibold p-1 border border-primary-dark border-opacity-30 rounded-custom-xs">
           <option value="Wooden Coaster"> Wooden Coaster</option>
         </select>
      </div>
     

      <div className="overflow-auto flex-grow">
        <table className="table-auto w-full text-center min-h-full font-poppins">
          <thead className="border-b border-primary-dark border-opacity-30 text-[12px] font-bold">
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Date Ordered</th>
            </tr>
          </thead>
          <tbody className="text-[10px] font-semibold">
            <tr>
              <td>1</td>
              <td>Cromwell Naval</td>
              <td>Wooden Coaster</td>
              <td>₱100</td>
              <td>May 30 2025</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Cromwell Naval</td>
              <td>Name Magnet</td>
              <td>₱150</td>
              <td>May 30 2025</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
