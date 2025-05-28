import React from "react";
import Sidebar from "../components/Navigation/Sidebar";
import Layout from "../components/Layout/Layout";
import CustomTable from "../components/Tables/CustomTable";
import Niel from "../components/Tables/Niel";

export default function Customer() {
  return (
    <div>
      <Layout>
        <div className="flex flex-col">
            <Niel/>
        </div>
      </Layout>
    </div>
  );
}
