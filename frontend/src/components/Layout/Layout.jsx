import React, { useState } from "react";
import Sidebar from "../Navigation/Sidebar";
import HeaderBar from "../Tables/HeaderBar";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import AuthModal from "../Modal/AuthModalWrapper";

export default function Layout({ children }) {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const openLogin = () => {
    setRegisterOpen(false);
    setLoginOpen(true);
  };

  const openRegister = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  return (
    <div className="flex bg-primary-light max-w-full h-full">
      <Sidebar />
      <div className="flex flex-col flex-1 max-w-full h-full">
        <HeaderBar onLoginClick={openLogin} />
        <main className="flex-1">{children}</main>
      </div>

      <AuthModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)}>
        <Login
          closeModal={() => setLoginOpen(false)}
          onSignupClick={openRegister}
        />
      </AuthModal>

      <AuthModal isOpen={isRegisterOpen} onClose={() => setRegisterOpen(false)}>
        <Register onBackToLogin={openLogin} />
      </AuthModal>
    </div>
  );
}
