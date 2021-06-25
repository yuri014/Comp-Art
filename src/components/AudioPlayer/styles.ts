import styled from 'styled-components';

const AudioPlayerContainer = styled.div`
  width: 100%;

  strong {
    text-align: center;
    font-size: clamp(2rem, 2vw, 2.8rem);
    width: 100%;
    display: block;
    margin-top: 3rem;
  }

  img {
    width: 100%;
    height: 25rem;
    border-radius: 5px;
  }

  #waveform {
    margin: 3rem 0;
  }

  .controls {
    margin-bottom: 2rem;

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
        cursor: pointer;

        &.play-button {
          font-size: 4rem;
        }
      }
    }
  }

  @media (min-width: 992px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 2rem 10rem;
    max-height: 50rem;
    gap: 4rem;

    img {
      width: 25rem;
      height: 25rem;
      display: block;
      margin: 0 auto;
    }

    .controls {
      padding: 0 8rem;
    }
  }
`;

export default AudioPlayerContainer;
