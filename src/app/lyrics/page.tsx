'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

// 노래 목록 샘플 - 현재는 대한민국 애국가만 포함
const songItems = [
  { name: '대한민국 애국가', id: 'national-anthem' }
];

export default function LyricsPage() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const songRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 키보드 네비게이션 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex(prev => (prev > 0 ? prev - 1 : songItems.length - 1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex(prev => (prev < songItems.length - 1 ? prev + 1 : 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (songRefs.current[activeIndex]) {
            router.push(`/lyrics/${songItems[activeIndex].id}`);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, router]);

  // 활성 항목에 포커스
  useEffect(() => {
    if (songRefs.current[activeIndex]) {
      songRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex]);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold mb-6">노래 가사 선택</h1>

      <div className="flex flex-col gap-6 w-full max-w-xl">
        {songItems.map((item, index) => (
          <div
            key={index}
            ref={el => songRefs.current[index] = el}
            className={`bg-gray-800 hover:bg-gray-900 text-white text-xl font-bold p-8 rounded-lg shadow-md transition-all transform hover:scale-105 focus:ring-4 focus:ring-gray-500 focus:outline-none cursor-pointer ${
              activeIndex === index ? 'ring-4 ring-gray-500 scale-105' : ''
            }`}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            tabIndex={0}
            onClick={() => router.push(`/lyrics/${item.id}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                router.push(`/lyrics/${item.id}`);
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
