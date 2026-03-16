import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Paging({ currentPage, totalItems, itemsPerPage, setCurrentPage }) {
  const {t} = useTranslation();

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  return (
    <div className="flex justify-center items-center mt-4 gap-4">
      <button
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-md cursor-pointer"
        title={t('back')}
      >
        <svg
          className={`w-5 h-5 ${
            currentPage === 1
              ? 'fill-gray-400 cursor-not-allowed'
              : 'fill-black hover:fill-[#9b0034] cursor-pointer'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <path d="M416 160C416 147.1 408.2 135.4 396.2 130.4C384.2 125.4 370.5 128.2 361.3 137.3L201.3 297.3C188.8 309.8 188.8 330.1 201.3 342.6L361.3 502.6C370.5 511.8 384.2 514.5 396.2 509.5C408.2 504.5 416 492.9 416 480L416 160z" />
        </svg>
      </button>

      <span className="font-medium text-gray-700">
        {t('page')} {currentPage} {t('on')} {totalPages}
      </span>


      <button
        onClick={() => {
          if (currentPage < totalPages) setCurrentPage((p) => p + 1);
        }}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-md cursor-pointer"
        title={t('next')}
      >
        <svg
          className={`w-5 h-5 ${
            currentPage === totalPages
              ? 'fill-gray-400 cursor-not-allowed'
              : 'fill-black hover:fill-[#9b0034] cursor-pointer'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <path d="M224.5 160C224.5 147.1 232.3 135.4 244.3 130.4C256.3 125.4 270 128.2 279.1 137.4L439.1 297.4C451.6 309.9 451.6 330.2 439.1 342.7L279.1 502.7C269.9 511.9 256.2 514.6 244.2 509.6C232.2 504.6 224.5 492.9 224.5 480L224.5 160z" />
        </svg>
      </button>
    </div>
  );
}