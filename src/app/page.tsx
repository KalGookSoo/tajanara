'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

const navItems = [
  { name: '가사', href: '/lyrics', color: 'bg-gray-800 hover:bg-gray-900' },
  { name: '게임', href: '/game', color: 'bg-gray-800 hover:bg-gray-900' },
  { name: '설정', href: '/settings', color: 'bg-gray-800 hover:bg-gray-900' },
  { name: '정보', href: '/info', color: 'bg-gray-800 hover:bg-gray-900' }
];

export default function Home() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // 키보드 네비게이션 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex(prev => (prev > 0 ? prev - 1 : navItems.length - 1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex(prev => (prev < navItems.length - 1 ? prev + 1 : 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (navRefs.current[activeIndex]) {
            router.push(navItems[activeIndex].href);
          }
          break;
        case 'Escape':
          // 필요한 경우 ESC 키 기능을 여기에 추가할 수 있음
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, router]);

  // 활성 항목에 포커스
  useEffect(() => {
    if (navRefs.current[activeIndex]) {
      navRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex]);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold mb-6 hidden">타자 연습 웹 애플리케이션에 오신 것을 환영합니다</h2>

      <p className="mb-8 max-w-2xl hidden">
        타자나라는 타자 속도와 정확도를 향상시키는 데 도움을 주는 웹 애플리케이션입니다.
        노래 가사를 통한 타자 연습과 다양한 게임을 통해 재미있게 타자 실력을 향상시켜 보세요.
      </p>

      <div className="flex flex-col gap-6 w-full max-w-xl">
        {navItems.map((item, index) => (
          <div
            key={index}
            ref={el => navRefs.current[index] = el as unknown as HTMLAnchorElement}
            className={`${item.color} text-white text-xl font-bold p-8 rounded-lg shadow-md transition-all transform hover:scale-105 focus:ring-4 focus:ring-gray-500 focus:outline-none cursor-pointer ${
              activeIndex === index ? 'ring-4 ring-gray-500 scale-105' : ''
            }`}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            tabIndex={0}
            onClick={() => router.push(item.href)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                router.push(item.href);
              }
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
