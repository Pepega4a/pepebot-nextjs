import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '../components/ui/Header';
import { Footer } from '../components/ui/Footer';
import './globals.css';
import { Providers } from './providers';

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-[#1a1d1a]">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </head>
      <body className="bg-[#1a1d1a]">

        <Providers>
          <LanguageProvider>
            <div className="min-h-screen min-w-screen bg-[#1a1d1a] text-white overflow-hidden">
              <Header />
              <main className="w-full h-full px-4 sm:px-6 md:px-8 bg-[#1a1d1a]">
                {children}
              </main>
              <Footer />
            </div>
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
