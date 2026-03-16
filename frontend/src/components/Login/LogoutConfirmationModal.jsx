import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiLogOut } from 'react-icons/fi';

export default function LogoutModal({ onCancel, onConfirm }) {
  const { t } = useTranslation();
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-6 shadow-xl w-[90%] max-w-md text-center">
        <FiLogOut className="text-[#790022] text-4xl mx-auto mb-4" />
        <h2 className="text-xl font-bold text-[#790022] mb-2">{t('logout')}</h2>
        <p className="mb-6 text-gray-700">{t('wantToLogout')}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
          >
            {t("cancel")}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-[#790022] text-white hover:bg-[#a1002b] cursor-pointer"
          >
            {t('toLogout')}
          </button>
        </div>
      </div>
    </div>
  );
}
