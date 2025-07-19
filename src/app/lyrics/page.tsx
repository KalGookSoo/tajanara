'use client';

import { useRouter } from 'next/navigation';
import { songItems } from '../shared/songs';
import Link from 'next/link';

export default function LyricsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold mb-6">노래 가사 선택</h2>

      <div className="flex flex-col gap-6 w-full max-w-xl">
        {songItems.map((item, index) => (
          <Link
            key={index}
            className="bg-gray-800 hover:bg-gray-900 text-white text-xl font-bold p-8 rounded-lg shadow-md transition-all transform hover:scale-105 focus:ring-4 focus:ring-gray-500 focus:outline-none cursor-pointer"
            href={`/lyrics/${item.id}`}
            onClick={() => router.push(`/lyrics/${item.id}`)}
          >
            {item.title} - {item.artist}
          </Link>
        ))}
      </div>
    </div>
  );
}
