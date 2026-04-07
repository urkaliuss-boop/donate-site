import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import AuthProvider from '@/components/layout/AuthProvider';
import CookieConsent from '@/components/ui/CookieConsent';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'FUNCLUB — Игровой Донат',
  description: 'Официальная платформа доната для серверов FUNCLUB SCP:CBM и SCP:SL.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${inter.className} bg-background text-text-primary`}>
        <AuthProvider>
          <Navbar />
          <main className="pt-16 min-h-screen">{children}</main>
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
