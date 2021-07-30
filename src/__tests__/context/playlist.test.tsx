import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import { PlaylistProvider } from '@context/playlist';
import AudioButtons from '@components/Post/Buttons/AudioButtons';
import { playlist, song } from '__mocks__/playlist';
import { IPlaylist } from '@components/PortalAudioPlayer';

describe('Create a playlist context do play song', () => {
  const getStoragePlaylist = () =>
    JSON.parse(localStorage.getItem('flow-playlist'));

  const createPlaylistRender = (
    songParam: IPlaylist,
    initialPlaylist: IPlaylist[] = [],
  ) =>
    render(
      <PlaylistProvider initialPlaylist={initialPlaylist}>
        <AudioButtons song={songParam} />
      </PlaylistProvider>,
    );

  it('Should add one song by clicking next song button', async () => {
    createPlaylistRender(song);

    fireEvent.click(screen.getByTestId('add-next-song'));

    const playlistStorage = await waitFor(() => getStoragePlaylist());

    expect(playlistStorage).toEqual([song]);
  });

  it('Should add one song by clicking add song button', async () => {
    fireEvent.click(screen.getByTestId('add-song'));

    const playlistStorage = await waitFor(() => getStoragePlaylist());

    expect(playlistStorage).toEqual([song, song]);
  });

  it('Should add one song in the second position of array', async () => {
    cleanup();
    createPlaylistRender(playlist[0], [song, song]);

    localStorage.setItem('lastPlayStatus', JSON.stringify(song));

    fireEvent.click(screen.getByTestId('add-next-song'));

    const playlistStorage = await waitFor(() => getStoragePlaylist());

    expect(playlistStorage).toEqual([song, playlist[0], song]);
  });
});
