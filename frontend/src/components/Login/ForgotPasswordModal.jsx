import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {apiLink} from '../../config/ApiLink';
import { useTranslation } from "react-i18next";

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();
  

  const handleSendEmail = async () => {
    if (!email) {
      toast.error(t("mailValidation"));
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${apiLink}/send-reset-email/`, {
        email,
        application: 'erpl',  
        });
      toast.success(t("resetLinkSent"));
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || t("sendingMailError"));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">{t("resetPassword")}</h2>
        <input
          type="email"
          placeholder="Votre email"
          value={t("email")}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleSendEmail}
          disabled={loading}
          className="w-full bg-[#790022] text-white py-2 rounded hover:bg-[#5e001b] transition-colors cursor-pointer"
        >
          {loading ? t("sending") : t("sendTheLink")}
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 border border-gray-300 py-2 rounded hover:bg-gray-100 transition-colors cursor-pointer"
        >
          {t("cancel")}
        </button>
      </div>
    </div>
  );
}
