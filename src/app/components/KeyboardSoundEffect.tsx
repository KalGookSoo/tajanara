'use client';

import { useEffect } from 'react';
import { useAudio } from '@/app/context/AudioContext';

export default function KeyboardSoundEffect() {
  const { playKeyboardSound } = useAudio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 수정자 키를 제외한 키 누름 시 소리 재생
      if (
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey &&
        e.key !== 'Shift' &&
        e.key !== 'Control' &&
        e.key !== 'Alt' &&
        e.key !== 'Meta'
      ) {
        playKeyboardSound();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playKeyboardSound]);

  // 이 컴포넌트는 아무것도 렌더링하지 않음
  return null;
}
