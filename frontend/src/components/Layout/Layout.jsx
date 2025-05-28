import React from "react";
import Sidebar from "../Navigation/Sidebar";
import HeaderBar from "../Tables/HeaderBar";

export default function Layout({ children }) {
  return (
    <div className="flex bg-primary-light min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <HeaderBar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

