import styled from 'styled-components';

interface AudioPostContainerProps {
  darkColor: string;
  lightColor: string;
}

const AudioPostContainer = styled.section<AudioPostContainerProps>`
  margin: 0 auto;
  margin-bottom: 1rem;

  .audio-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background: ${({ theme }) => theme.colors.lightSecondaryBackground};
    border-radius: 5px;
    height: 40rem;
    border-top: 1rem solid ${props => props.darkColor};

    .thumbnail {
      img {
        width: 20rem;
        height: 20rem;
        border-radius: 5px;
        margin-top: 1rem;
      }
    }

    .audio-card-content {
      padding: 1rem 2rem;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      a {
        display: contents;
      }

      .audio-card-info {
        a {
          text-align: center;
          width: 100%;
        }
      }

      .audio-buttons {
        margin-top: 1rem;
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
    color: ${props => props.darkColor};
  }

  p {
    color: ${({ theme }) => theme.colors.themeColor};
    &.music-name {
      font-weight: 700;
      font-size: 2rem;
    }

    &.music-name,
    &.artist-name {
      width: fit-content;
      max-width: 30rem;
      text-overflow: ellipsis;
      overflow: hidden;

      &:hover {
        text-decoration: underline;
        text-decoration-color: inherit;
      }
    }

    &.artist-name {
      font-weight: 400;
      font-size: 1.4rem;
      color: ${props => props.darkColor};
    }
  }

  @media (min-width: 1100px) {
    .audio-card {
      flex-direction: row;
      height: 21rem;

      .thumbnail {
        img {
          width: 16rem;
          height: 14rem;
          margin: 0;
          margin-left: 2rem;
        }
      }

      .audio-card-content {
        padding: 3rem 2rem;

        .audio-card-info {
          a {
            text-align: left;
            padding: 0;
            display: contents;
          }
        }

        .progress {
          .duration {
            transform: translateY(-1.2rem);
          }
        }
      }
    }
  }
`;

export default AudioPostContainer;
