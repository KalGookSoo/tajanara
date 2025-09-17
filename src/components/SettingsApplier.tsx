'use client';

import { useEffect } from 'react';
import { useAppSelector } from '@/shared/lib/state/hooks';
import { selectFont, selectLanguage } from '@/shared/lib/state/slices/settingsSlice';

/**
 * 이 컴포넌트는 설정을 애플리케이션에 적용합니다.
 * 보이는 것은 렌더링하지 않지만, 폰트와 같은 설정을 문서에 적용합니다.
 */
export default function SettingsApplier() {
  const font = useAppSelector(selectFont);
  const language = useAppSelector(selectLanguage);

  // 폰트 설정 적용
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--app-font-family', font);
      document.body.style.fontFamily = 'var(--app-font-family)';
    }
  }, [font]);

  // 언어 설정 적용
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  // 이 컴포넌트는 보이는 것을 렌더링하지 않음
  return null;
}
