'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import useTranslation from '@/hooks/useTranslation';
import { motion } from 'framer-motion';

interface LanguageSelectorProps {
    className?: string;
    size?: number;
}

export const LanguageSelector = ({ className }: LanguageSelectorProps) => {
  const { locale, setLocale } = useLanguage();

  return (
    <div className={`${className || 'flex flex-col gap-1'}`} style={{ userSelect: 'none' }}>
      <div className={`flex items-center bg-[#1e231e] rounded-md relative w-[70px]`} style={{ userSelect: 'none' }}>
        <div 
          className="absolute h-full w-[35px] bg-[#43b581] rounded transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(${locale === 'en' ? '35px' : '0'})`,
            userSelect: 'none'
          }}
        />
        <button
          onClick={() => setLocale('ru')}
          className={`relative w-[35px] py-1 z-10 transition-colors duration-300 text-center text-sm ${
            locale === 'ru' 
              ? 'text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
          style={{ userSelect: 'none' }}
        >
          RU
        </button>
        <button
          onClick={() => setLocale('en')}
          className={`relative w-[35px] py-1 z-10 transition-colors duration-300 text-center text-sm ${
            locale === 'en' 
              ? 'text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
          style={{ userSelect: 'none' }}
        >
          EN
        </button>
      </div>
    </div>
  );
}; 

export const LanguageSelector2 = ({ className }: LanguageSelectorProps) => {
  const { locale, setLocale } = useLanguage();
  const { t } = useTranslation();


  return (
    <div className={`${className || 'flex flex-col gap-1'}`} style={{ userSelect: 'none' }}>
      <div className={`flex items-center bg-[#43b581] rounded-md relative w-[50px]`} style={{ userSelect: 'none' }}>
        <motion.button
          onClick={() => {if(locale === 'en') setLocale('ru'); else setLocale('en')}}
          className={`relative w-[50px] py-3.5 z-10 transition-colors duration-300 text-center text-sm`}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{ userSelect: 'none' }}
        >
          {t('lang.this')}
        </motion.button>
      </div>
    </div>
  );
}; 