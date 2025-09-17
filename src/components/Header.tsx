'use client';

import React from 'react';
import Link from 'next/link';
import { Settings, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MuteButton from './MuteButton';

export default function Header() {
  return (
    <header className="py-4 border-b">
      <div className="container mx-auto px-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <MuteButton />
        </div>
        <h1 className="text-3xl font-bold text-center">타자나라</h1>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" aria-label="설정">
            <Link href="/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" aria-label="로그인">
            <Link href="/login" className="flex items-center gap-1">
              <LogIn className="h-4 w-4" />
              <span>로그인</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
