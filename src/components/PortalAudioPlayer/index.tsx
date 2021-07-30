import React, { useContext } from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';

import { PlaylistContext } from '@context/playlist';
import ThemeContext from '@context/theme';
import 'react-jinke-music-player/assets/index.css';
import { FaPause, FaPlay, FaTimes } from 'react-icons/fa';
import customLocale from './lang';

export interface IPlaylist {
  musicSrc: string;
  name: string;
  cover: string;
  singer: string;
}

export interface PortalAudioPlayerProps {
  playlist: Array<IPlaylist>;
}

const PortalAudioPlayer: React.FC<PortalAudioPlayerProps> = ({ playlist }) => {
  const { resetPlaylist } = useContext(PlaylistContext);
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <ReactJkMusicPlayer
      audioLists={playlist}
      showDownload={false}
      onAudioPlay={audio => {
        document.title = audio.name;
      }}
      locale={customLocale}
      showMediaSession
      mode="full"
      remember
      quietUpdate
      clearPriorAudioLists
      theme={isDarkMode ? 'dark' : 'light'}
      showMiniProcessBar
      spaceBar
      icon={{
        play: <FaPlay />,
        pause: <FaPause />,
        close: <FaTimes />,
      }}
      onDestroyed={async () => {
        localStorage.removeItem('lastPlayStatus');
        localStorage.removeItem('flow-playlist');
      }}
      onAudioListsChange={(_, songs) => {
        const newOrderPlaylist = songs.map(song => ({
          cover: song.cover,
          musicSrc: song.musicSrc as string,
          name: song.name as string,
          singer: song.singer as string,
        }));
        resetPlaylist(newOrderPlaylist);
      }}
    />
  );
};
export default PortalAudioPlayer;
