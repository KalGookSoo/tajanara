'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function BackButton() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  if (isHomePage) return null;

  // 현재 경로 기준으로 상위 경로 계산
  const pathSegments = pathname.split('/').filter(Boolean);
  const backPath = pathSegments.length > 1 ? `/${pathSegments.slice(0, -1).join('/')}` : '/';

  return (
    <Link
      href={backPath}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="뒤로 가기"
    >
      <ArrowLeftIcon className="w-6 h-6" />
    </Link>
  );
}
