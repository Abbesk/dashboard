import Sidebar from '../Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function LayoutWithSidebar({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleSlideshowChange = (event) => {
      setIsSlideshowActive(Boolean(event.detail?.active));
    };

    window.addEventListener('dashboard-slideshow-change', handleSlideshowChange);

    return () => {
      window.removeEventListener('dashboard-slideshow-change', handleSlideshowChange);
    };
  }, []);

  return (
    <>
      {!isSlideshowActive && (
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen((prev) => !prev)}
          setLoading={setLoading}
          onLogout={onLogout}
        />
      )}

      <main className="relative min-h-screen bg-gray-50">
        <Outlet key={location.pathname} />
      </main>

      {loading && (
        <div className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-black/35 backdrop-blur-sm">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
          <p className="mt-3 text-base font-semibold text-white">Déconnexion en cours...</p>
        </div>
      )}
    </>
  );
}
