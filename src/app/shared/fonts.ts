export interface Font {
  id: number;
  value: string;
  name: string;
}

export const fonts: Font[] = [
  { id: 1, name: '기본체 (시스템 폰트)', value: 'system-ui' },
  { id: 2, name: '나눔고딕', value: 'Nanum Gothic, sans-serif' },
  { id: 3, name: '나눔명조', value: 'Nanum Myeongjo, serif' },
  { id: 4, name: 'Pretendard', value: 'Pretendard, sans-serif' },
  { id: 5, name: 'Geist Sans', value: 'var(--font-geist-sans)' },
  { id: 6, name: 'Geist Mono', value: 'var(--font-geist-mono)' }
];
