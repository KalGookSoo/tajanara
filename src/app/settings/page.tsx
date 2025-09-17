'use client';

import React, { useEffect, useState } from 'react';
import { fonts } from '@/app/shared/fonts';
import {
  selectFont,
  selectLanguage,
  selectSoundEnabled,
  setFont,
  setLanguage,
  setSoundEnabled
} from '@/shared/lib/state/slices/settingsSlice';
import { useAppSelector } from '@/shared/lib/state/hooks';

export default function SettingsPage() {
  const soundEnabled = useAppSelector(selectSoundEnabled);
  const font = useAppSelector(selectFont);
  const language = useAppSelector(selectLanguage);
  const [isClient, setIsClient] = useState(false);

  // 하이드레이션 후 클라이언트 측에서만 컴포넌트 렌더링
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 언어 변경 핸들러
  const handleLanguageChange = (language: 'ko' | 'en') => {
    setLanguage(language);
  };

  // 폰트 변경 핸들러
  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFont(event.target.value);
  };

  // 효과음 변경 핸들러
  const handleSoundChange = (enabled: boolean) => {
    setSoundEnabled(enabled);
  };

  // 클라이언트 측 코드가 실행될 때까지 로딩 상태 표시
  if (!isClient) {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">설정</h1>
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">설정</h1>

      {/* 언어 설정 섹션 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">언어 설정</h2>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="language"
              checked={language === 'ko'}
              onChange={() => handleLanguageChange('ko')}
              className="mr-2"
            />
            한국어 (Korean)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="language"
              checked={language === 'en'}
              onChange={() => handleLanguageChange('en')}
              className="mr-2"
            />
            영어 (English)
          </label>
        </div>
      </section>

      {/* 폰트 설정 섹션 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">서체 설정</h2>
        <div className="mb-4">
          <select value={font} onChange={handleFontChange} className="w-full p-2 border rounded">
            {fonts.map((font) => (
              <option key={font.id} value={font.value}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        {/* 폰트 미리보기 */}
        <div className="p-4 border rounded" style={{ fontFamily: font }}>
          <p className="mb-2">폰트 미리보기:</p>
          <p>가나다라마바사 / ABCDEFGHIJKLMN / 1234567890</p>
          <p>The quick brown fox jumps over the lazy dog.</p>
        </div>
      </section>

      {/* 효과음 설정 섹션 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">효과음 설정</h2>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="sound"
              checked={soundEnabled}
              onChange={() => handleSoundChange(true)}
              className="mr-2"
            />
            켜기
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="sound"
              checked={!soundEnabled}
              onChange={() => handleSoundChange(false)}
              className="mr-2"
            />
            끄기
          </label>
        </div>
      </section>

      <div className="text-sm text-gray-500 mt-8">
        <p>설정은 자동으로 저장되며, 브라우저를 닫았다가 다시 열어도 유지됩니다.</p>
      </div>
    </div>
  );
}
