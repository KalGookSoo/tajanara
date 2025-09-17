import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { JSX } from 'react';

const navItems = [
  { name: '가사', href: '/lyrics' },
  { name: '게임', href: '/game' },
  { name: '설정', href: '/settings' },
  { name: '정보', href: '/info' }
];

export default function Home(): JSX.Element {
  return (
    <nav aria-label="메뉴" className="w-full max-w-sm">
      <ul className="flex flex-col gap-4">
        {navItems.map((item) => (
          <li key={item.href}>
            <Button variant="outline" asChild size="lg" className="w-full">
              <Link href={item.href} aria-label={item.name}>
                {item.name}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
