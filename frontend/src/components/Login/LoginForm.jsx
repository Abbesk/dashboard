import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPasswordModal from './ForgotPasswordModal';
import AnimatedInput from '../Utils/AnimatedInput';
import { apiLink } from '../../config/ApiLink';
import userData from '../../config/UserData';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from '../Utils/LanguageSwitch';
import FirstConnectionModal from './FirstConnectionModal';
import {applicationTitle} from '../../config/ApplicationTitle';

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState('');
  const [showFirstConnectionModal, setShowFirstConnectionModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setApplication('dashboard');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(apiLink + '/login/', {
        username: username.toLowerCase(),
        password,
        application,
      });

      const data = res.data;

      localStorage.setItem('userData', JSON.stringify(data));
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);

      userData.access = data.access;
      userData.refresh = data.refresh;
      userData.user = data.user;

      setLoggedUser(data.user);

      const redirect = localStorage.getItem('redirectAfterLogin');

      if (data.user.firstConnection) {
        setShowFirstConnectionModal(true);
      } else {
        onLogin(userData.access);
        if (redirect) {
          localStorage.removeItem('redirectAfterLogin');
          navigate(redirect);
        } else {
          navigate('/home');
        }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || t("connexionError");
      toast.error(errorMessage, {
        position: 'top-center',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFirstConnectionDone = () => {
    onLogin(userData.access);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <ToastContainer />

      {!showFirstConnectionModal && (
        <div className="absolute right-10 top-0 w-30 max-w-sm mt-6">
          <LanguageSwitch isOpen={true} />
        </div>
      )}

      <FirstConnectionModal
        isOpen={showFirstConnectionModal}
        onClose={() => setShowFirstConnectionModal(false)}
        user={loggedUser}
        token={userData.access}
        onFirstConnectionDone={handleFirstConnectionDone}
      />

      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
      />

      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full max-w-sm p-8 bg-white rounded-2xl shadow-lg">
        <img
          src="https://framb-intranet/wp-content/uploads/2025/06/Logo_Fareva.jpg"
          className="w-50 mb-5"
          alt=""
        />
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">{applicationTitle}</h2>

        <AnimatedInput
          id="username"
          label={t('username')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />

        <AnimatedInput
          id="password"
          label={t('password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#790022] text-white font-semibold py-2 rounded-lg transition-colors duration-300
            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#a1002b] cursor-pointer'}
          `}
        >
          {loading ? t('loading') : t('login')}
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          <button
            type="button"
            // onClick={() => setShowForgotPasswordModal(true)}
            className="text-[#790022] hover:underline cursor-pointer"
          >
            {t("forgottenPasswordQuestion")}
          </button>
        </p>
      </form>
    </div>
  );
}
