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

  const AddSongButton = () => (
    <Tooltip title="Adicionar à playlist" placement="top" arrow>
      <IconButton
        onClick={() => {
          addSong(song);
        }}
        aria-label="adicionar à playlist"
        data-testid="add-song"
      >
        <MdPlaylistAdd />
      </IconButton>
    </Tooltip>
  );

  const AddNextSongButton = () => (
    <Tooltip
      title="Ouvir em seguida na playlist"
      placement="top"
      onClick={() => {
        addNextSong(song);
      }}
      arrow
    >
      <IconButton
        aria-label="Ouvir em seguida na playlist"
        data-testid="add-next-song"
      >
        <MdQueuePlayNext />
      </IconButton>
    </Tooltip>
  );

  return (
    <AudioButtonsStyles>
      <AddSongButton />
      {children}
      <AddNextSongButton />
    </AudioButtonsStyles>
  );
};

export default AudioButtons;
