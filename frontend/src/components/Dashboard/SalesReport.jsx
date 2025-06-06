import React from "react";
import Overview from "./Overview";
import Layout from "../Layout/Layout";
import Orders from "./Orders";

export default function SalesReport() {
  return (
    <div 
    className="flex flex-col h-full gap-2 p-5
    custom-mobileSmall:grid custom-mobileSmall:grid-cols-1">
      <Overview />
      <Orders/>
    </div>
  );
}
