import React, { useContext } from 'react';
import { MdPlaylistAdd, MdQueuePlayNext } from 'react-icons/md';
import { Tooltip, IconButton } from '@material-ui/core';

import { IPlaylist } from '@components/PortalAudioPlayer';
import { PlaylistContext } from '@context/playlist';
import AudioButtonsStyles from './styles';

interface AudioButtonsProps {
  song: IPlaylist;
}

const AudioButtons: React.FC<AudioButtonsProps> = ({ children, song }) => {
  const { addSong, addNextSong } = useContext(PlaylistContext);

  return (
    <AudioButtonsStyles>
      <Tooltip title="Adicionar à playlist" placement="top" arrow>
        <IconButton
          onClick={() => {
            addSong(song);
          }}
          aria-label="adicionar à playlist"
        >
          <MdPlaylistAdd />
        </IconButton>
      </Tooltip>
      {children}
      <Tooltip
        title="Ouvir em seguida na playlist"
        placement="top"
        onClick={() => {
          addNextSong(song);
        }}
        arrow
      >
        <IconButton aria-label="Ouvir em seguida na playlist">
          <MdQueuePlayNext />
        </IconButton>
      </Tooltip>
    </AudioButtonsStyles>
  );
};

export default AudioButtons;
