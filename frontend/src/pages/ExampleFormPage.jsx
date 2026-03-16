import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ExampleFormPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(t('formSubmitSuccess') || 'Formulaire soumis avec succès !');
    console.log(formData);
  };

    const goHome = () => navigate("/home");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex items-center flex-col justify-center p-6">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h1 className="text-3xl font-bold text-[#790022] text-center">
          {t('formTitle') || 'Exemple de formulaire'}
        </h1>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">{t('firstName') || 'Prénom'}</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#790022]"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">{t('lastName') || 'Nom'}</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#790022]"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">{t('email') || 'Email'}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#790022]"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">{t('password') || 'Mot de passe'}</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#790022]"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#790022] text-white py-2 rounded-full font-semibold hover:bg-[#9b0034] transition-all cursor-pointer"
        >
          {t('submit') || 'Soumettre'}
        </button>
      </form>
        <button
        onClick={goHome}
        className="px-10 py-3.5 mt-4 rounded-full bg-[#790022] text-white font-semibold text-base shadow-md hover:scale-105 hover:shadow-xl transition-all cursor-pointer"
        >
            {t("backHome")}
        </button>
    </div>
  );
}
