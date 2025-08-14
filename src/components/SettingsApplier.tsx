'use client';

import { useEffect } from 'react';
import { useSettingsStore } from '@/app/store/settingsStore';

/**
 * 이 컴포넌트는 설정을 애플리케이션에 적용합니다.
 * 보이는 것은 렌더링하지 않지만, 폰트와 같은 설정을 문서에 적용합니다.
 */
export default function SettingsApplier() {
  const { state } = useSettingsStore();

  // 폰트 설정 적용
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--app-font-family', state.font);
      document.body.style.fontFamily = 'var(--app-font-family)';
    }
  }, [state.font]);

  // 언어 설정 적용
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = state.language;
    }
  }, [state.language]);

  // 이 컴포넌트는 보이는 것을 렌더링하지 않음
  return null;
}
