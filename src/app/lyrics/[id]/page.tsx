import { getApiUrl } from '@/app/shared/config';
import { JSX } from 'react';
import Content from '@/app/lyrics/[id]/_content';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const getSong = async (id: string) => {
  const data = await fetch(getApiUrl(`/songs/${id}`));
  const json = await data.json();
  return json.song as Song;
};

export default async function LyricsPracticePage({ params }: Props): Promise<JSX.Element> {
  const { id } = await params;
  const song: Song = await getSong(id);
  return <Content song={song} />;
}
