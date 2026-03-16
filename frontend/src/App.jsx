import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './config/i18n';
import { LanguageProvider } from './contexts/LanguageProvider.jsx';
import LoginPage from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import LayoutWithSidebar from './components/LayoutWithSidebar';
import { ToastContainer } from "react-toastify";
import SettingsPage from './pages/SettingsPage';
import HomePage from './pages/HomePage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import UnauthorizedPage from "./pages/UnauthorizedPage";
import RoleRoute from './components/RoleRoute.jsx';
import userData from './config/UserData.js';
import RandomExampleRedirect from './components/RandomExampleRedirect.jsx';
import ExecutiveDashboardPage from './pages/dashboards/ExecutiveDashboardPage.jsx';
import UapDashboardPage from './pages/dashboards/UapDashboardPage.jsx';
import LineDashboardPage from './pages/dashboards/LineDashboardPage.jsx';



export default function App() {
  const [token, setToken] = useState(localStorage.getItem('access') || '');

  const handleLogin = (newToken) => {
    localStorage.setItem('access', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    setToken('');
  };

  const defaultRoute = token ? "/home" : "/login";

  const role = userData?.user?.roles?.[0]?.name;

  return (
    <>
      <ToastContainer />
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          <Routes>

            {/* ROUTE LOGIN */}
            <Route
              path="/login"
              element={
                token ? <Navigate to="/home" replace /> : <LoginPage onLogin={handleLogin} />
              }
            />

            {/* ROUTES PRIVÉES */}
            <Route
              element={
                <PrivateRoute token={token}>
                  <LayoutWithSidebar onLogout={handleLogout} />
                </PrivateRoute>
              }
            >
              <Route 
                path="/home"
                element={
                  <RoleRoute role={role} allowedRoles={['operateur', 'technicien', 'ingenieur', 'manageur', 'admin']}>
                    <HomePage />
                  </RoleRoute>
                }
              />
              <Route
                path="/example"
                element={
                  <RoleRoute role={role} allowedRoles={['operateur', 'technicien', 'ingenieur', 'manageur', 'admin']}>
                    <RandomExampleRedirect />
                  </RoleRoute>
                }
              />
              <Route 
                path="/dashboard/codir"
                element={
                  <RoleRoute role={role} allowedRoles={['operateur', 'technicien', 'ingenieur', 'manageur', 'admin']}>
                    <ExecutiveDashboardPage />
                  </RoleRoute>
                }
              />
              <Route 
                path="/dashboard/uap"
                element={
                  <RoleRoute role={role} allowedRoles={['operateur', 'technicien', 'ingenieur', 'manageur', 'admin']}>
                    <UapDashboardPage />
                  </RoleRoute>
                }
              />
              <Route 
                path="/dashboard/ligne"
                element={
                  <RoleRoute role={role} allowedRoles={['operateur', 'technicien', 'ingenieur', 'manageur', 'admin']}>
                    <LineDashboardPage />
                  </RoleRoute>
                }
              />
              <Route 
                path="/settings"
                element={
                  <RoleRoute role={role} allowedRoles={['manageur', 'admin']}>
                    <SettingsPage />
                  </RoleRoute>
                }
              />
            </Route>

            {/* RESET PASSWORD */}
            <Route path="/reset-password/:uidb64/:token" element={<ResetPasswordPage />} />

            {/* REDIRECTION PAR DÉFAUT */}
            <Route path="/" element={<Navigate to={defaultRoute} replace />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />

            <Route path="/unauthorized" element={<UnauthorizedPage />} />

          </Routes>
        </LanguageProvider>
      </I18nextProvider>
    </>
  );
}
