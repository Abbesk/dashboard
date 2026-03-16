import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { FaBars, FaFile } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import userData from './config/UserData';
import LogoutModal from './components/Login/LogoutConfirmationModal';
import LanguageSwitch from './components/Utils/LanguageSwitch';
import { axiosApi } from './config/AxiosInstance';
import { useTranslation } from 'react-i18next';
import { applicationTitle } from './config/ApplicationTitle';

const roleHierarchy = {
  admin: 1,
};

export default function Sidebar({ isOpen, onToggle, setLoading, onLogout }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { key: 'dashboard-codir', label: 'Dashboard Codir', icon: FaFile, path: '/dashboard/codir', minRole: 'admin' },
    { key: 'dashboard-uap', label: 'Dashboard UAP', icon: FaFile, path: '/dashboard/uap', minRole: 'admin' },
    { key: 'dashboard-ligne', label: 'Dashboard Ligne', icon: FaFile, path: '/dashboard/ligne', minRole: 'admin' },
    { key: 'settings', label: t('settings'), icon: FaGear, path: '/settings', minRole: 'admin' },
  ];

  const userRole = userData?.user?.roles?.[0]?.name;
  const userLevel = roleHierarchy[userRole] ?? 0;

  return (
    <>
      <header className="sticky top-0 z-[1000] border-b border-slate-200 bg-white text-slate-900 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 lg:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              to="/home"
              className="flex min-w-0 items-center gap-3 transition-opacity hover:opacity-90"
            >
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden border border-slate-200 bg-white shadow-sm">
                <img
                  src="/fav.jpg"
                  alt="Logo entreprise"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                  Navigation
                </p>
                <p className="truncate text-base font-bold text-[#790022]">{applicationTitle}</p>
              </div>
            </Link>
          </div>

          <button
            type="button"
            onClick={onToggle}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#790022] transition hover:border-[#790022] hover:bg-[#fff7f9] md:hidden"
            title={isOpen ? t('closeSidebar') : t('openSidebar')}
          >
            <FaBars />
            Menu
          </button>

          <div
            className={`${isOpen ? 'flex' : 'hidden'} w-full flex-col gap-3 md:flex md:w-auto md:flex-row md:items-center md:gap-3`}
          >
            <nav className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center">
              {menuItems.map((item) => {
                const requiredLevel = roleHierarchy[item.minRole];
                if (userLevel < requiredLevel) return null;

                return (
                  <NavLink
                    key={item.key}
                    to={item.path}
                    title={item.label}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                        isActive
                          ? 'border-[#790022] bg-[#790022] text-white shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-[#790022]/30 hover:bg-[#fff7f9] hover:text-[#790022]'
                      }`
                    }
                  >
                    <item.icon className="text-base" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            <div className="hidden h-8 w-px bg-slate-200 md:block" />

            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <LanguageSwitch isOpen />
              </div>

              <button
                onClick={() => setShowLogoutModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#790022] hover:bg-[#fff7f9] hover:text-[#790022]"
                title={t('logout')}
              >
                <FiLogOut className="text-base" />
                <span>{t('logout')}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {showLogoutModal && (
        <LogoutModal
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={async () => {
            setLoading(true);
            try {
              const refresh = localStorage.getItem('refresh');
              if (!refresh) throw new Error('Refresh token non trouvé');

              await axiosApi.post(`/logout/`, { refresh });

              localStorage.removeItem('access');
              localStorage.removeItem('refresh');
              localStorage.removeItem('userData');
              onLogout?.();
              navigate('/');
            } catch (error) {
              console.error('Erreur lors de la déconnexion :', error.response?.data || error);
            } finally {
              setLoading(false);
              setShowLogoutModal(false);
            }
          }}
        />
      )}
    </>
  );
}
