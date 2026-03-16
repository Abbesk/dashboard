import { useLanguage } from '../../contexts/LanguageContext';
import { FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitch({ isOpen, className }) {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative bg-[#790022] text-white rounded-md w-full hover:bg-[#a1002b] transition-all">
        {isOpen && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <FaGlobe className="text-lg" />
          </div>
        )}

        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          disabled={!isOpen}
          className={`w-full appearance-none bg-transparent text-white font-medium rounded-md focus:outline-none block ${!isOpen ? 'px-2' : 'w-full'} h-full py-2 ${!isOpen ? 'pl-3.5' : 'pl-10'} pr-3
            ${!isOpen ? 'cursor-not-allowed' : 'cursor-pointer'}
          `}
          title={language}
        >
          <option value="fr" className="text-black">{isOpen ? 'Français' : 'FR'}</option>
          <option value="en" className="text-black">{isOpen ? 'English' : 'EN'}</option>
          <option value="de" className="text-black">{isOpen ? 'Deutsch' : 'DE'}</option>
          <option value="es" className="text-black">{isOpen ? 'Español' : 'ES'}</option>
          <option value="it" className="text-black">{isOpen ? 'Italiano' : 'IT'}</option>
        </select>
      </div>
    </div>
  );
}
