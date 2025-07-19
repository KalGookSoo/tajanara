'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function BackButton() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  // ESC 키 누름으로 뒤로 가기 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isHomePage) {
        e.preventDefault();
        router.push('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHomePage, router]);

  if (isHomePage) return null;

  return (
    <Link 
      href="/" 
      className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="뒤로 가기"
    >
      <ArrowLeftIcon className="w-6 h-6" />
    </Link>
  );
}
