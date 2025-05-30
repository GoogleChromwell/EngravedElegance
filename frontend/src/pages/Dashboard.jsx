import React from "react";
import Layout from "../components/Layout/Layout";
import SalesReport from "../components/Dashboard/SalesReport";

export default function Dashboard() {
  return (
    <Layout>
      <div className="flex flex-col h-full">
        <SalesReport/>
      </div>
    </Layout>
  );
}
