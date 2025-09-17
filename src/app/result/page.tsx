'use client';

import React, { JSX, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFetch } from '@/lib/hooks/useFetch';
import { Input } from '@/components/ui/input';

// ResultContent 컴포넌트는 useSearchParams를 사용하는 실제 내용을 담당
const ResultContent = (): JSX.Element => {
  const { isPending, isError, executeFetch } = useFetch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const artist = searchParams.get('artist')!;
  const title = searchParams.get('title')!;
  const time = searchParams.get('time') || '0';
  const cpm = searchParams.get('cpm') || '0';
  const accuracy = searchParams.get('accuracy') || '0';

  const playerName = 'anonymousUsername'; // fixme playerName은 isAuthentication에 따라 동적으로 할당할 것

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    debugger;
    // TODO Submit
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">연습 결과</h2>

        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-500 dark:text-gray-400">{artist}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">시간</p>
            <p className="text-xl font-bold">{formatTime(time)}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">CPM</p>
            <p className="text-xl font-bold">{cpm}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">정확도</p>
            <p className="text-xl font-bold">{accuracy}%</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              이름
            </label>
            <Input
              type="text"
              id="playerName"
              name="playerName"
              defaultValue={playerName}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="이름을 입력하세요 (20자 이내)"
              maxLength={20}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {isPending ? '제출 중...' : '결과 저장하기'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Format time from seconds to MM:SS
const formatTime = (seconds: string): string => {
  const secs = parseInt(seconds, 10);
  const mins = Math.floor(secs / 60);
  const remainingSecs = secs % 60;
  return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
};

// 메인 페이지 컴포넌트에서 Suspense 경계 설정
const ResultPage = (): JSX.Element => {
  return (
    <Suspense
      fallback={<div className="flex justify-center items-center min-h-[calc(100vh-200px)]">결과를 불러오는 중...</div>}
    >
      <ResultContent />
    </Suspense>
  );
};

export default ResultPage;
