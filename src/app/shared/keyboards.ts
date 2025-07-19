export interface Keyboard {
  id: number;
  name: string;
  description: string;
  href: string;
}

export const keyboardItems: Keyboard[] = [
  {
    id: 1,
    name: 'Tactile Mechanical Keyboard',
    description: 'A single key press on a tactile mechanical keyboard.',
    href: '/keyboard_01.ogg'
  },
  {
    id: 2,
    name: 'Vintage Keyboard',
    description: 'A keystroke of a 1986 DOS mechanical keyboard.',
    href: '/keyboard_03.wav'
  }
];
