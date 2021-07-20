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
  const { addSong } = useContext(PlaylistContext);

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
        title="Adicionar à playlist e tocar em seguida"
        placement="top"
        arrow
      >
        <IconButton aria-label="Adicionar à playlist e tocar em seguida">
          <MdQueuePlayNext />
        </IconButton>
      </Tooltip>
    </AudioButtonsStyles>
  );
};

export default AudioButtons;
