'use client';

import Link from 'next/link';

const navItems = [
  { name: '가사', href: '/lyrics', color: 'bg-gray-800 hover:bg-gray-900' },
  { name: '게임', href: '/game', color: 'bg-gray-800 hover:bg-gray-900' },
  { name: '설정', href: '/settings', color: 'bg-gray-800 hover:bg-gray-900' },
  { name: '정보', href: '/info', color: 'bg-gray-800 hover:bg-gray-900' }
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold mb-6 hidden">타자 연습 웹 애플리케이션에 오신 것을 환영합니다</h2>

      <p className="mb-8 max-w-2xl hidden">
        타자나라는 타자 속도와 정확도를 향상시키는 데 도움을 주는 웹 애플리케이션입니다. 노래 가사를 통한 타자 연습과
        다양한 게임을 통해 재미있게 타자 실력을 향상시켜 보세요.
      </p>

      <div className="flex flex-col gap-6 w-full max-w-xl">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`${item.color} text-white text-xl font-bold p-8 rounded-lg shadow-md transition-all transform hover:scale-105 focus:ring-4 focus:ring-gray-500 focus:outline-none cursor-pointer text-center`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
