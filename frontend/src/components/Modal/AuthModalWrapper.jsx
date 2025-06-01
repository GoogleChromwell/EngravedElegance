// components/ModalWrapper.jsx
import React from 'react';

export default function AuthModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center ">
      <div className="bg-white border border-primary-dark border-opacity-50  p-2 rounded-lg shadow-sm w-fit h-fit relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-black"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
