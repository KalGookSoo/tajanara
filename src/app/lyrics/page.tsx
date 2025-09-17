import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getApiUrl } from '@/app/shared/config';

const getSongs = async () => {
  const data = await fetch(getApiUrl('/songs'));
  const json = await data.json();
  return json.content as Song[];
};

export default async function LyricsPage() {
  const songs: Song[] = await getSongs();
  return (
    <>
      <nav aria-label="노래 목록" className="w-full max-w-sm">
        <ul className="flex flex-col gap-4">
          {songs.map((item, index) => (
            <li key={index}>
              <Button variant="outline" asChild size="lg" className="w-full">
                <Link href={`/lyrics/${item.id}`} aria-label={item.title}>
                  {item.title} - {item.artist}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
