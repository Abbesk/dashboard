import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";


function SettingsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();



  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-[#790022] mb-8">
        {t("settings")}
      </h1>

    </div>
  );
}

export default SettingsPage;
