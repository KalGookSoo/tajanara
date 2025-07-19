'use client';

import { useEffect, useRef, useState } from 'react';
import { songItems } from '../../shared/songs';
import { useParams, useRouter } from 'next/navigation';

export default function LyricsPracticePage() {
  const params = useParams();
  const router = useRouter();

  // 현재 음악 탐색
  const songId = parseInt(params.id as string, 10);
  const song = songItems.find((item) => item.id === songId) || songItems[0];

  // 현재 입력 상태
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // 현재 스코어 상태
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [wpm, setWpm] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [totalErrors, setTotalErrors] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [accuracy, setAccuracy] = useState('0');

  // 컴포넌트가 마운트될 때 입력 필드에 포커스 및 타이머 시작
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // 타이머 시작
    setStartTime(Date.now());
    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // 폼 제출 처리 함수
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 입력이 비어있으면 처리하지 않음 (WPM 버그 수정)
    if (!song.lyrics[currentLineIndex] || !song.lyrics[currentLineIndex].length) {
      return;
    }

    // 현재 라인이 유효한지 확인
    if (currentLineIndex >= song.lyrics.length) {
      return;
    }

    // 현재 줄과 입력 비교하여 오류 계산
    const currentLine = song.lyrics[currentLineIndex];

    // 입력된 각 문자에 대해 오류 확인
    const inputErrors = userInput
      .split('')
      .filter((char, i) => i >= currentLine.length || char !== currentLine[i]).length;

    // 누락된 문자도 오류로 계산
    const missingErrors = userInput.length < currentLine.length ? currentLine.length - userInput.length : 0;

    const lineErrors = inputErrors + missingErrors;

    // 총 오류 및 문자 수 업데이트
    setTotalErrors((prev) => prev + lineErrors);
    setTotalChars((prev) => prev + currentLine.length);

    // 정확도 계산 및 업데이트 (폼 제출 시 일괄 계산)
    const newTotalErrors = totalErrors + lineErrors;
    const newTotalChars = totalChars + currentLine.length;
    if (newTotalChars > 0) {
      const newAccuracy = Math.max(0, Math.min(100, Math.round((1 - newTotalErrors / newTotalChars) * 1000) / 10));
      setAccuracy(newAccuracy.toFixed(1));
    }

    // 마지막 줄인지 확인
    const isLastLine = currentLineIndex === song.lyrics.length - 1;
    if (!isLastLine) {
      // 다음 줄로 이동
      setCurrentLineIndex((prev) => prev + 1);
      setUserInput('');
      return;
    }

    // 타이머 정지
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // 결과 페이지로 이동
    const url = new URL('/result', window.location.href);
    url.searchParams.set('time', elapsedTime.toString());
    url.searchParams.set('wpm', wpm.toString());
    url.searchParams.set('accuracy', accuracy);
    url.searchParams.set('artist', song.artist);
    url.searchParams.set('title', song.title);
    router.push(url.href);
  };

  // 입력 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const prevInput = userInput;
    setUserInput(input);

    // 입력이 현재 줄과 일치하는지 확인
    const currentLine = song.lyrics[currentLineIndex];

    // 입력한 부분이 현재 줄의 시작 부분과 일치하는지 확인
    const isInputCorrect = currentLine.startsWith(input);
    setIsCorrect(isInputCorrect);

    // 실제 타이핑된 문자 수 업데이트 (입력이 증가한 경우에만)
    if (input.length > prevInput.length) {
      // 실제로 추가된 문자 수만큼만 증가
      const charsAdded = input.length - prevInput.length;
      setTypedChars((prev) => prev + charsAdded);
    }

    // WPM 계산 (1분당 평균 단어 수, 단어는 평균 5자로 가정)
    if (elapsedTime > 0) {
      // 분당 타자 수 = (총 타자 수 / 경과 시간(초)) * 60
      const charsPerMinute = (typedChars / elapsedTime) * 60;
      // WPM = 분당 타자 수 / 5 (평균 단어 길이)
      const calculatedWpm = Math.round(charsPerMinute / 5);
      setWpm(calculatedWpm);
    }
  };

  // 슬라이딩 디스플레이에 표시할 줄 가져오기 (현재 줄과 그 전후 몇 줄)
  const getVisibleLines = () => {
    const visibleLines = [];
    const numLinesToShow = 5; // 표시할 총 줄 수
    const halfNumLines = Math.floor(numLinesToShow / 2);

    for (let i = currentLineIndex - halfNumLines; i <= currentLineIndex + halfNumLines; i++) {
      if (i >= 0 && i < song.lyrics.length) {
        visibleLines.push({
          text: song.lyrics[i],
          index: i
        });
      } else {
        // 패딩을 위한 빈 줄 추가
        visibleLines.push({
          text: '',
          index: i
        });
      }
    }

    return visibleLines;
  };

  // 시간 형식 변환 (초 -> MM:SS)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-center">
            {song.title} - {song.artist}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg">
              <span className="text-sm text-gray-500">시간:</span>
              <span className="ml-2 font-medium">{formatTime(elapsedTime)}</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg">
              <span className="text-sm text-gray-500">WPM:</span>
              <span className="ml-2 font-medium">{wpm}</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg">
              <span className="text-sm text-gray-500">정확도:</span>
              <span className="ml-2 font-medium">{accuracy}%</span>
            </div>
          </div>
        </div>

        {/* 슬라이딩 가사 디스플레이 */}
        <div className="relative w-full h-60 overflow-hidden mb-8 border rounded-lg flex items-center justify-center">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {getVisibleLines().map((line, index) => {
              const isCurrent = line.index === currentLineIndex;
              const position = index - Math.floor(getVisibleLines().length / 2);

              return (
                <div
                  key={index}
                  className={`w-full h-12 flex items-center justify-center transition-all duration-300 text-center ${
                    isCurrent ? 'font-bold text-lg bg-gray-100 dark:bg-gray-800' : 'text-gray-500 text-base'
                  }`}
                  style={{
                    transform: `translateY(${position * 48}px)`,
                    opacity: isCurrent ? 1 : Math.max(0.5, 1 - Math.abs(position) * 0.2)
                  }}
                >
                  {line.text}
                </div>
              );
            })}
          </div>

          {/* 중앙 표시기 */}
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 border-t border-b border-gray-300 dark:border-gray-700 h-12 pointer-events-none"></div>
        </div>
      </div>

      {/* 타이핑 입력 영역 */}
      <div className="w-full max-w-2xl mt-auto">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <p className="mb-2 text-sm text-gray-500">현재 줄:</p>
          <p className="mb-4 font-medium">{song.lyrics[currentLineIndex]}</p>

          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                isCorrect ? 'focus:ring-green-500 border-green-300' : 'focus:ring-red-500 border-red-300'
              }`}
              placeholder="여기에 타이핑하세요."
              required
            />
            <button type="submit" className="sr-only">제출</button>
          </form>

          <p className="mt-2 text-sm text-gray-500">
            {isCorrect ? '올바르게 입력하고 있습니다.' : '입력이 일치하지 않습니다. 다시 시도하세요.'}
          </p>
        </div>
      </div>
    </div>
  );
}
