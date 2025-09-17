import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import BackButton from '@/components/BackButton';
import SettingsApplier from '@/components/SettingsApplier';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React, { JSX } from 'react';
import ReduxProvider from '@/app/redux-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: '타자나라 - 타자 연습 웹 애플리케이션',
  description: '노래 가사, 게임 등을 통한 타자 연습 웹 애플리케이션'
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <ReduxProvider>
          <SettingsApplier />
          <div className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-black">
            <Header />
          </div>

          <div className="flex-grow overflow-auto pt-16 pb-16">
            <main className="container mx-auto px-4 py-8">
              <div className="mb-4">
                <BackButton />
              </div>
              {children}
            </main>
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-10 bg-white dark:bg-black">
            <Footer />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
