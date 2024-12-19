'use client';

import useTranslation from '@/hooks/useTranslation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  const { t } = useTranslation();

  return (
    <footer aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-4 text-center text-gray-400">
          <p>&copy; {currentYear} {t('footer.siteName')}. {t('footer.rightsReserved')}</p>
          <nav className="flex flex-col md:flex-row justify-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
            <Link href="/privacy" className="hover:text-gray-300">{t('footer.privacyPolicy')}</Link>
            <Link href="/terms" className="hover:text-gray-300">{t('footer.termsOfService')}</Link>
            <Link href="/contact" className="hover:text-gray-300">{t('footer.contactUs')}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};