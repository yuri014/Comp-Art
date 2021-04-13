import styled from 'styled-components';

const AudioPostContainer = styled.section`
  margin: 0 auto;
  margin-bottom: 2rem;

  .audio-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${({ theme }) => theme.colors.lightSecondaryBackground};
    border-radius: 5px;
    border-top: 1rem solid ${({ theme }) => theme.colors.mainColor};

    .audio-card-content {
      padding: 1rem 2rem;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .audio-buttons {
        margin-top: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .primary-audio-button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 50%;
        }

        .secondary-button {
          filter: brightness(0.4);
        }
      }

      .progress {
        margin-bottom: -1rem;

        .duration {
          display: flex;
          justify-content: space-between;
          font-size: 1.4rem;
          transform: translateY(-1.6rem);
        }
      }
    }
  }

  span {
    color: ${({ theme }) => theme.colors.mainColor};
  }

  p {
    color: ${({ theme }) => theme.colors.themeColor};
    &.music-name {
      font-weight: 700;
      font-size: 2rem;
    }

    &.artist-name {
      font-weight: 400;
      font-size: 1.4rem;
      color: #4bf1e3;
    }
  }
`;

export default AudioPostContainer;