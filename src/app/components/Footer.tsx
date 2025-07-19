'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="py-4 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              타자 노래 최고기록: <span className="font-bold">98 WPM</span>
            </p>
            <p className="text-sm">
              게임 최고기록: <span className="font-bold">2,450점</span>
            </p>
          </div>
          <div className="text-sm text-gray-500">
            <p>© 2025 타자나라. 모든 권리 보유.</p>
            <p>제작자: dorffdoyevskyi</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
