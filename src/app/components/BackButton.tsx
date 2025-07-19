'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function BackButton() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

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
