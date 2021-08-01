import { css } from 'styled-components';

const PortalAudioPlayerStyles = css`
  /* Global styles */
  .react-jinke-music-player-main::-webkit-scrollbar-thumb {
    background-color: #1cc5b7;
  }

  .react-jinke-music-player-main
    .music-player-panel
    .panel-content
    .rc-slider-handle,
  .react-jinke-music-player-main
    .music-player-panel
    .panel-content
    .rc-slider-track,
  .react-jinke-music-player-main.light-theme .rc-switch-checked,
  .react-jinke-music-player-mobile-progress .rc-slider-handle,
  .react-jinke-music-player-mobile-progress .rc-slider-track {
    background-color: #1cc5b7 !important;
  }

  .react-jinke-music-player .music-player-controller,
  .react-jinke-music-player-main.light-theme svg,
  .react-jinke-music-player-main svg:active,
  .react-jinke-music-player-main svg:hover {
    color: #1cc5b7;
  }

  .react-jinke-music-player .audio-circle-process-bar circle[class='stroke'] {
    stroke: #1cc5b7;
  }

  .react-jinke-music-player-main .music-player-panel .panel-content {
    box-shadow: 2px 2px 4px #000;
  }

  /* Dark theme styles */
  .dark-theme {
    .music-player-panel {
      background-color: #111112;
      .panel-content {
        .progress-bar-content .audio-title {
          color: #f5f5ff;
          font-size: 1.3rem;
        }

        .rc-slider-handle,
        .react-jinke-music-player-main
          .music-player-panel
          .panel-content
          .rc-slider-track {
          background-color: #1cc5b7;
        }
      }
    }
  }

  /* Light theme styles */
  .light-theme {
    .music-player-panel {
      background-color: var(--color-background-alternative);

      .panel-content .progress-bar-content .audio-title {
        font-size: 1.3rem;
        color: #414145;
      }
    }
  }

  .react-jinke-music-player-main.light-theme .music-player-panel {
    color: #414145;
  }

  @media screen and (max-width: 767px) {
    /* Dark mobile theme styles */
    .react-jinke-music-player-main.dark-theme
      .audio-lists-panel
      .audio-item.playing,
    .react-jinke-music-player-main.dark-theme
      .audio-lists-panel
      .audio-item.playing
      svg {
      color: #1cc5b7 !important;
    }

    .react-jinke-music-player-main.dark-theme
      .audio-item.playing
      .player-singer {
      color: #1cc5b7 !important;
    }

    /* Light mobile theme styles */
    .react-jinke-music-player-main.light-theme
      .audio-lists-panel
      .audio-item.playing,
    .react-jinke-music-player-main.light-theme
      .audio-lists-panel
      .audio-item.playing
      svg {
      color: #077e76 !important;
    }

    .react-jinke-music-player-main.light-theme
      .audio-item.playing
      .player-singer {
      color: #077e76 !important;
    }
  }
`;

export default PortalAudioPlayerStyles;
