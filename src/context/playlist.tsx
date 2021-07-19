import React, { createContext, useState } from 'react';
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
}

export const PlaylistContext = createContext<IPlaylistContext>(null);

export const PlaylistProvier: React.FC = ({ children }) => {
  const [playlist, setPlaylist] = useState<IPlaylist[]>([]);

  const addSong = (song: IPlaylist) => {
    setPlaylist([...playlist, song]);
  };

  return (
    <PlaylistContext.Provider value={{ playlist, addSong }}>
      {children}
      {playlist.length > 0 && <PortalAudioPlayer playlist={playlist} />}
    </PlaylistContext.Provider>
  );
};
