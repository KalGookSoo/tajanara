import { Song } from '../../shared/songs';
import { getApiUrl } from '@/app/shared/config';
import { JSX } from 'react';
import Content from '@/app/lyrics/[id]/_content';

type Props = {
  params: {
    id: string;
  };
};

export default async function LyricsPracticePage({ params }: Props): Promise<JSX.Element> {
  // 현재 음악 탐색
  const songId = parseInt(params.id as string, 10);
  const data = await fetch(getApiUrl(`/songs/${songId}`));
  const json = await data.json();
  const song: Song = json.song as Song;

  return <Content song={song} />;
}
