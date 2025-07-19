import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import BackButton from './components/BackButton';
import MuteButton from '@/app/components/MuteButton';
import KeyboardSoundEffect from '@/app/components/KeyboardSoundEffect';
import { AudioProvider } from '@/app/context/AudioContext';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Providers from './providers';

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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <AudioProvider>
          <KeyboardSoundEffect />
          <div className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-black">
            <Header />
          </div>

          <div className="flex-grow overflow-auto pt-16 pb-16">
            <main className="container mx-auto px-4 py-8">
              <div className="mb-4 flex justify-between items-center">
                <div>
                  <BackButton />
                </div>
                <div>
                  <MuteButton />
                </div>
              </div>
              <Providers>
                {children}
              </Providers>
            </main>
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-10 bg-white dark:bg-black">
            <Footer />
          </div>
        </AudioProvider>
      </body>
    </html>
  );
}
