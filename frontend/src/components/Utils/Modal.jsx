import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function Modal({ children, onClose }) {

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-[2001]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-6xl w-full relative overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-[#792200] text-2xl font-bold cursor-pointer"
        >
          <FaTimes />
        </button>

        {children}
      </div>
    </div>
  );
}
