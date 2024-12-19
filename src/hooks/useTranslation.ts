'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import ru from '@/translations/ru';
import en from '@/translations/en';

const translations = { ru, en };

export default function useTranslation() {
  const { locale } = useLanguage();
  
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[locale as keyof typeof translations];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value?.toString() || key;
  };

  return { t };
} 