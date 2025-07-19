'use client';

import { useEffect, useState, useRef } from 'react';

// 대한민국 애국가 가사 샘플
const nationalAnthemLyrics = [
  "동해물과 백두산이 마르고 닳도록",
  "하느님이 보우하사 우리나라 만세",
  "무궁화 삼천리 화려강산",
  "대한사람 대한으로 길이 보전하세",
  "",
  "남산 위에 저 소나무 철갑을 두른 듯",
  "바람서리 불변함은 우리 기상일세",
  "무궁화 삼천리 화려강산",
  "대한사람 대한으로 길이 보전하세",
  "",
  "가을 하늘 공활한데 높고 구름 없이",
  "밝은 달은 우리 가슴 일편단심일세",
  "무궁화 삼천리 화려강산",
  "대한사람 대한으로 길이 보전하세",
  "",
  "이 기상과 이 맘으로 충성을 다하여",
  "괴로우나 즐거우나 나라 사랑하세",
  "무궁화 삼천리 화려강산",
  "대한사람 대한으로 길이 보전하세"
];

export default function LyricsPracticePage({ params }: { params: { id: string } }) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // 컴포넌트가 마운트될 때 입력 필드에 포커스
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 입력 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);

    // 입력이 현재 줄과 일치하는지 확인
    const currentLine = nationalAnthemLyrics[currentLineIndex];
    setIsCorrect(currentLine.startsWith(input));

    // 입력이 현재 줄과 완전히 일치하면 다음 줄로 이동
    if (input === currentLine) {
      setCurrentLineIndex(prev => (prev < nationalAnthemLyrics.length - 1 ? prev + 1 : prev));
      setUserInput('');
    }
  };

  // 슬라이딩 디스플레이에 표시할 줄 가져오기 (현재 줄과 그 전후 몇 줄)
  const getVisibleLines = () => {
    const visibleLines = [];
    const numLinesToShow = 5; // 표시할 총 줄 수
    const halfNumLines = Math.floor(numLinesToShow / 2);

    for (let i = currentLineIndex - halfNumLines; i <= currentLineIndex + halfNumLines; i++) {
      if (i >= 0 && i < nationalAnthemLyrics.length) {
        visibleLines.push({
          text: nationalAnthemLyrics[i],
          index: i
        });
      } else {
        // 패딩을 위한 빈 줄 추가
        visibleLines.push({
          text: "",
          index: i
        });
      }
    }

    return visibleLines;
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">대한민국 애국가</h2>

        {/* 슬라이딩 가사 디스플레이 (아이폰 시간 선택기와 유사) */}
        <div className="relative w-full h-60 overflow-hidden mb-8 border rounded-lg flex items-center justify-center">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {getVisibleLines().map((line, index) => {
              const isCurrent = line.index === currentLineIndex;
              const position = index - Math.floor(getVisibleLines().length / 2);

              return (
                <div
                  key={index}
                  className={`w-full h-12 flex items-center justify-center transition-all duration-300 text-center ${
                    isCurrent 
                      ? 'font-bold text-lg bg-gray-100 dark:bg-gray-800' 
                      : 'text-gray-500 text-base'
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
          <p className="mb-4 font-medium">{nationalAnthemLyrics[currentLineIndex]}</p>

          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              isCorrect ? 'focus:ring-green-500 border-green-300' : 'focus:ring-red-500 border-red-300'
            }`}
            placeholder="여기에 타이핑하세요..."
          />

          <p className="mt-2 text-sm text-gray-500">
            {isCorrect 
              ? '올바르게 입력하고 있습니다.' 
              : '입력이 일치하지 않습니다. 다시 시도하세요.'}
          </p>
        </div>
      </div>
    </div>
  );
}
