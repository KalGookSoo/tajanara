'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playKeyboardSound: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 오디오 요소 생성
    audioRef.current = new Audio('/keyboard_tactile_10.ogg');

    // 컴포넌트가 언마운트될 때 정리
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const playKeyboardSound = () => {
    if (!isMuted && audioRef.current) {
      // 오디오를 처음으로 되돌리고 재생
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.error('오디오 재생 오류:', error);
      });
    }
  };

  return <AudioContext.Provider value={{ isMuted, toggleMute, playKeyboardSound }}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio는 AudioProvider 내에서 사용되어야 합니다');
  }
  return context;
}
