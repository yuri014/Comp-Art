/**
 * - Remove o item lastPlayStatus criado pela prop `remember`
 * - Remove a playlist criada
 *
 * Precisa ter async por causa da tipagem da lib
 */
const clearPlaylistStorage = async (): Promise<void> => {
  localStorage.removeItem('lastPlayStatus');
  localStorage.removeItem('flow-playlist');
};

export default clearPlaylistStorage;
