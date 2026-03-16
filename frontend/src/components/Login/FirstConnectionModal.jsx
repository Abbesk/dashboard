import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import AnimatedInput from "../Utils/AnimatedInput";
import LanguageSwitch from "../Utils/LanguageSwitch";
import { axiosApi } from "../../config/AxiosInstance";

export default function FirstConnectionModal({ isOpen, onClose, user, token, onFirstConnectionDone }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError(t("passwordsDoNotMatch"));
      return;
    }

    setLoading(true);
    try {
      await axiosApi.put(`/users/${user.id}/set-password/`, {
        new_password: newPassword,
      });

      toast.success(t("passwordUpdated"));

      try {
        await axiosApi.put(`/users/${user.id}/set-first-connection-false/`, {});
      } catch (err) {
        console.error(err);
        setError(t("updateError"));
        toast.error(t("updateError"));
      }

      if (onFirstConnectionDone) {
        onFirstConnectionDone();
      }

      onClose();
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(t("updateError"));
      toast.error(t("updateError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0, 0, 0, 0.5)] px-4 backdrop-blur-sm">
      <ToastContainer />
      <div className="absolute right-10 top-0 w-30 max-w-sm mt-6">
        <LanguageSwitch isOpen={true} />
      </div>
      <div className="relative w-full max-w-sm p-8 bg-white rounded-2xl shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-[#790022] cursor-pointer transition-colors duration-200 focus:outline-none"
          aria-label={t('closeModal')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <img
          src="https://framb-intranet/wp-content/uploads/2025/06/Logo_Fareva.jpg"
          alt="Logo"
          className="w-40 mx-auto mb-6"
        />

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          {t("firstConnectionTitle")}
        </h2>
        <p className="mb-6 text-center text-gray-600">
          {t("firstConnectionInstruction")}
        </p>

        <form onSubmit={handleSubmit}>
          <AnimatedInput
            id="new-password"
            label={t("newPassword")}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={loading}
          />

          <AnimatedInput
            id="confirm-password"
            label={t("confirmPassword") || "Confirmer le mot de passe"}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />

          {error && <p className="mt-2 mb-4 text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#790022] text-white font-semibold py-2 rounded-lg transition-colors duration-300
              ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#5e001b] cursor-pointer"}
            `}
          >
            {loading ? t("loading") || "Chargement..." : t("validate") || "Valider"}
          </button>
        </form>
      </div>
    </div>
  );
}
