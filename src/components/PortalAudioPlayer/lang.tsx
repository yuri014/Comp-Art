import { FaHeadphones } from 'react-icons/fa';

const customLocale = {
  playModeText: {
    order: 'Ordem',
    orderLoop: 'Repetir todas as faixas',
    singleLoop: 'Repetir faixa atual',
    shufflePlay: 'Modo aleatório',
  },
  openText: 'Abrir',
  closeText: 'Minimizar',
  emptyText: 'Vazio',
  clickToPlayText: 'Tocar',
  clickToPauseText: 'Pausar',
  nextTrackText: 'Próxima faixa',
  previousTrackText: 'Faixa anterior',
  reloadText: 'Voltar ao ínicio',
  volumeText: 'Volume',
  playListsText: 'Playlist',
  toggleLyricText: 'toggleLyricText',
  toggleMiniModeText: 'Minimizar',
  destroyText: 'Excluir playlist',
  downloadText: 'downloadText',
  lightThemeText: 'L',
  darkThemeText: 'D',
  switchThemeText: 'Trocar tema',
  removeAudioListsText: 'Limpar playlist',
  emptyLyricText: 'emptyLyricText',
  clickToDeleteText: (name: string): string => `Deletar: ${name}`,
  // eslint-disable-next-line react/react-in-jsx-scope
  controllerTitle: <FaHeadphones />,
};

export default customLocale;
