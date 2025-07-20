'use client';

import { useEffect, useReducer } from 'react';

export interface SettingsState {
  language: 'ko' | 'en';
  font: string;
  soundEnabled: boolean;
}

export type SettingsAction =
  | { type: 'SET_LANGUAGE'; payload: 'ko' | 'en' }
  | { type: 'SET_FONT'; payload: string }
  | { type: 'SET_SOUND_ENABLED'; payload: boolean }
  | { type: 'TOGGLE_SOUND_ENABLED' };

export const initialState: SettingsState = {
  language: 'ko',
  font: 'system-ui',
  soundEnabled: true
};

export function settingsReducer(state: SettingsState, action: SettingsAction): SettingsState {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_FONT':
      return { ...state, font: action.payload };
    case 'SET_SOUND_ENABLED':
      return { ...state, soundEnabled: action.payload };
    case 'TOGGLE_SOUND_ENABLED':
      return { ...state, soundEnabled: !state.soundEnabled };
    default:
      return state;
  }
}

// 설정 스토어 훅
export function useSettingsStore() {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  // 초기 렌더링 후 클라이언트 측에서만 localStorage에서 설정 로드
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('tj-settings');
      if (savedSettings) {
        try {
          const parsedSettings = JSON.parse(savedSettings);
          // 저장된 설정으로 상태 업데이트
          if (parsedSettings.language) dispatch({ type: 'SET_LANGUAGE', payload: parsedSettings.language });
          if (parsedSettings.font) dispatch({ type: 'SET_FONT', payload: parsedSettings.font });
          if (parsedSettings.soundEnabled !== undefined) dispatch({ type: 'SET_SOUND_ENABLED', payload: parsedSettings.soundEnabled });
        } catch (error) {
          console.error('localStorage에서 설정을 파싱하는데 실패했습니다:', error);
        }
      }
    }
  }, []);

  // 설정이 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tj-settings', JSON.stringify(state));
    }
  }, [state]);

  // 비프음 재생 함수
  const playKeyboardSound = () => {
    // 브라우저 환경에서만 실행
    if (typeof window === 'undefined' || !state.soundEnabled) {
      return;
    }

    try {
      // 웹 오디오 API를 사용하여 간단한 비프음 생성
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = 'sine'; // 사인파 (부드러운 소리)
      oscillator.frequency.value = 800; // 주파수 (Hz)
      gainNode.gain.value = 0.1; // 볼륨 (0-1)

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1); // 0.1초 동안 재생
    } catch (error) {
      console.error('비프음 재생 오류:', error);
    }
  };

  // 소리 켜기/끄기 토글 함수
  const toggleSound = () => {
    dispatch({ type: 'TOGGLE_SOUND_ENABLED' });
  };

  return {
    state,
    dispatch,
    playKeyboardSound,
    toggleSound
  };
}
