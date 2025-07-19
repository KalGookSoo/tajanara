'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

  // ResultContent 컴포넌트는 useSearchParams를 사용하는 실제 내용을 담당
  function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get metrics from URL parameters
  const artist = searchParams.get('artist')!;
  const title = searchParams.get('title')!;
  const time = searchParams.get('time') || '0';
  const wpm = searchParams.get('wpm') || '0';
  const accuracy = searchParams.get('accuracy') || '0';

  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');

  // Placeholder mutation function
  const submitResults = async (data: {
    playerName: string;
    artist: string;
    title: string;
    time: string;
    wpm: string;
    accuracy: string
  }) => {
    // This would typically be an API call to save the results
    console.log('Submitting results:', data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
  };

  // Use react-query's useMutation
  const mutation = useMutation({
    mutationFn: submitResults,
    onSuccess: () => {
      // Navigate back to home after successful submission
      router.push('/');
    }
  });

  // Handle player name input
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
    if (e.target.value.length > 0) {
      setError('');
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!playerName.trim()) {
      setError('이름을 입력해주세요.');
      return;
    }

    if (playerName.length > 20) {
      setError('이름은 20자 이내로 입력해주세요.');
      return;
    }

    // Submit the form using the mutation
    mutation.mutate({
      playerName,
      artist,
      title,
      time,
      wpm,
      accuracy
    });
  };

  // Format time from seconds to MM:SS
  const formatTime = (seconds: string): string => {
    const secs = parseInt(seconds, 10);
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
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
            <p className="text-sm text-gray-500 dark:text-gray-400">WPM</p>
            <p className="text-xl font-bold">{wpm}</p>
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
            <input
              type="text"
              id="playerName"
              name="playerName"
              value={playerName}
              onChange={handleNameChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="이름을 입력하세요 (20자 이내)"
              maxLength={20}
              required
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {mutation.isPending ? '제출 중...' : '결과 저장하기'}
          </button>
        </form>
      </div>
    </div>
  );
}

// 메인 페이지 컴포넌트에서 Suspense 경계 설정
export default function ResultPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-[calc(100vh-200px)]">결과를 불러오는 중...</div>}>
      <ResultContent />
    </Suspense>
  );
}
