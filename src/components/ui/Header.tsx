'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import useTranslation from '@/hooks/useTranslation';
import { LanguageSelector } from './LanguageSelector';
import { JenkinsLogo } from '@/components/icons/IconsSvg';
import { signIn, signOut, useSession } from 'next-auth/react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { locale, setLocale } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const handleEscape = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsMenuOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    // Добавляем обработчик клика на весь документ
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Удаляем обработчик при размонтировании компонента
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const { data: session } = useSession();
  const handleSignIn = () => {
    signIn('discord');
  }

  const handleSignOut = () => {
    signOut();
  }


  return (
    <header className="bg-[#1a1d1a] w-full z-50" onKeyDown={handleEscape}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 text-white text-xl font-bold">
              <JenkinsLogo className="w-8 h-8" />
              <span>Pepe Bot</span>
            </Link>

            {/* Desktop menu */}
            <nav className="hidden md:flex items-center ml-6 space-x-4">
              <Link href="/documentation" className="text-white hover:text-gray-300">{t('nav.docs')}</Link>
              <Link href="/commands" className="text-white hover:text-gray-300">{t('nav.commands')}</Link>
              <Link href="/metrix" className="text-white hover:text-gray-300">{t('nav.metrix')}</Link>
              <Link href="/donate" className="text-white hover:text-gray-300">{t('nav.donate')}</Link>
            </nav>
          </div>

          {/* Right side navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative" ref={modalRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-gray-300 p-2"
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>

              {isMenuOpen && (
                <div className="absolute z-50 right-0 mt-2 w-48 rounded-md shadow-lg bg-[#313631] ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-out">
                  <div className="py-1">
                    <div className="flex items-center justify-between px-4 py-2 text-white hover:bg-gray-700 transition-colors duration-150">
                      {t('nav.lang')}
                      <LanguageSelector />
                    </div>
                    <Link href="#" className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors duration-150">
                      {t('nav.gethelp')}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {session ? (
              <>
                <p>Добро пожаловать, 
                  <Link href="/profile" className="text-white hover:text-gray-300">
                    {session.user?.name}!
                  </Link>
                </p>
                <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                  Выйти
                </button>
              </>
            ) : (
              <button onClick={handleSignIn} className="bg-[#43b581] text-white px-4 py-2 rounded-md hover:bg-[#3ca374]">
                {t('nav.signin')}
              </button>
            )}

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300"
              aria-haspopup="true"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1a1d1a] border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => {
                setLocale('en' ? 'ru' : 'en');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-white hover:bg-gray-700"
            >
              {locale === 'en' ? 'RU' : 'EN'}
            </button>
            <Link href="/commands" className="block w-full text-left px-3 py-2 rounded-md text-white hover:text-gray-300">
              {t('nav.commands')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};