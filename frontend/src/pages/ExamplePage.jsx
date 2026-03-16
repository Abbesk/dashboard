import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import Modal from "../components/Utils/Modal";

export default function ExemplePage() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);


    const goHome = () => navigate("/home");


    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 px-6 py-12">
            <ToastContainer />
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-5xl font-extrabold text-[#790022] tracking-tight drop-shadow-sm mb-4">
                    {t("exampleTitle")}
                </h1>
                <h2 className="text-2xl font-semibold text-gray-700 opacity-90 mb-6">
                    {t("exampleSubtitle")}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                    {t("exampleDescription")}<br /><br />
                    {t("exampleAdditionalInfo")}
                </p>
            </div>
            <div className="w-full flex justify-center mb-14">
                <div className="w-32 h-1 bg-[#790022] rounded-full shadow-md"></div>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
                <button
                onClick={goHome}
                className="px-10 py-3.5 rounded-full bg-[#790022] text-white font-semibold text-base shadow-md hover:scale-105 hover:shadow-xl transition-all cursor-pointer"
                >
                    {t("backHome")}
                </button>
                <button
                onClick={() => setIsModalOpen(true)}
                className="px-10 py-3.5 rounded-full bg-gray-700 text-white font-semibold text-base shadow-md hover:scale-105 hover:shadow-xl transition-all cursor-pointer"
                >
                    {t("openModal") || "Ouvrir Modal"}
                </button>
            </div>
            {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}>
                <h2 className="text-2xl font-bold text-[#790022] mb-4">{t("modalTitle")}</h2>
                <p className="text-gray-700 mb-4">{t("modalContent")}</p>
                <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-full bg-[#790022] text-white font-semibold hover:bg-[#9b0034] transition cursor-pointer"
                >
                    {t("close")}
                </button>
            </Modal>
            )}
        </div>
    );
}