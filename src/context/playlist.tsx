import React, { createContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  IPlaylist,
  PortalAudioPlayerProps,
} from '@components/PortalAudioPlayer';

const PortalAudioPlayer = dynamic(
  () => import('@components/PortalAudioPlayer'),
  {
    ssr: false,
  },
);

interface IPlaylistContext extends PortalAudioPlayerProps {
  addSong: (song: IPlaylist) => void;
  addNextSong: (song: IPlaylist) => void;
  resetPlaylist: (songs: IPlaylist[]) => void;
}

export const PlaylistContext = createContext<IPlaylistContext>(null);

interface PlaylistProvierProps {
  initialPlaylist: IPlaylist[];
}

export const PlaylistProvier: React.FC<PlaylistProvierProps> = ({
  children,
  initialPlaylist,
}) => {
  const [playlist, setPlaylist] = useState<IPlaylist[]>([]);

  const addSong = (song: IPlaylist) => {
    setPlaylist([...playlist, song]);
  };

  const addNextSong = (song: IPlaylist) => {
    const { musicSrc } = JSON.parse(
      window.localStorage.getItem('lastPlayStatus'),
    ) as IPlaylist;

    const currentIndex = playlist.findIndex(item => item.musicSrc === musicSrc);
    const insertSong = () =>
      playlist
        .slice(0, currentIndex + 1)
        .concat(song, playlist.slice(currentIndex + 1));

    setPlaylist(insertSong());
  };

  const resetPlaylist = (songs: IPlaylist[]) => {
    setPlaylist(songs);
  };

  useEffect(() => {
    if (playlist.length > 0) {
      localStorage.setItem('flow-playlist', JSON.stringify(playlist));
    }
  }, [playlist]);

  useEffect(() => {
    setPlaylist(initialPlaylist);
  }, [initialPlaylist]);

  return (
    <PlaylistContext.Provider
      value={{ playlist, addSong, addNextSong, resetPlaylist }}
    >
      {children}
      {playlist.length > 0 && <PortalAudioPlayer playlist={playlist} />}
    </PlaylistContext.Provider>
  );
};
