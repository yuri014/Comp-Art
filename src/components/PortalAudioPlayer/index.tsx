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
  />
);

export default PortalAudioPlayer;
