import React from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';
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

const PortalAudioPlayer: React.FC<PortalAudioPlayerProps> = ({ playlist }) => (
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
      spaceBar
      icon={{
        play: <FaPlay />,
        pause: <FaPause />,
        close: <FaTimes />,
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

export default PortalAudioPlayer;
