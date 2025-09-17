'use client';

import React from 'react';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="py-4 border-t">
      <div className="container mx-auto px-4">
        <Separator className="mb-3" />
        <div className="flex w-full items-center justify-center text-sm text-gray-500">
          <p>© 2025 타자나라. 모든 권리 보유. 제작자: dorffdoyevskyi</p>
        </div>
      </div>
    </footer>
  );
}
