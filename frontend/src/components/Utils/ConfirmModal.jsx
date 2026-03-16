import React from "react";
import { useTranslation } from 'react-i18next';

export default function ConfirmModal({ isOpen, onCancel, onConfirm, title, message }) {
  if (!isOpen) return null;
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-3">{title}</h2>
        <p className="mb-5">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            {t("cancel")}
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            {t("confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}
