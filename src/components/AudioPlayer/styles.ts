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
    margin-bottom: 3rem;

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
  }
`;

export default AudioPlayerContainer;
