import styled from 'styled-components';

const AudioPlayerContainer = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: 25rem;
  }

  #waveform {
    margin: 3rem 0;
  }

  .controls {
    .buttons {
      display: flex;
      align-items: center;
      justify-content: space-around;
      button {
        color: ${({ theme }) => theme.colors.gray};
        background: none;
        border: none;
        border-radius: 50%;
        font-size: 3rem;

        &.play-button {
          font-size: 4rem;
        }
      }
    }

    .slider {
      appearance: none;
      width: 50%;
      display: block;
      margin: 3rem auto;
      height: 1rem;
      border-radius: 5px;
      background: ${({ theme }) => theme.colors.gray};
      outline: none;
      opacity: 0.7;
      transition: opacity 0.2s;
    }

    .slider:hover {
      opacity: 1;
    }

    .slider::-webkit-slider-thumb {
      appearance: none;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.mainColor};
      cursor: pointer;
    }

    .slider::-moz-range-thumb {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.mainColor};
      cursor: pointer;
    }
  }
`;

export default AudioPlayerContainer;
