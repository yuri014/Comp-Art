import styled from 'styled-components';

const AudioPostContainer = styled.section`
  margin: 0 auto;
  margin-bottom: 2rem;

  .post-counts {
    margin-top: 1rem;

    button {
      color: ${({ theme }) => theme.colors.lightContrast};
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 1.6rem;
      display: flex;
      align-items: center;

      &:focus {
        outline: 1px solid ${({ theme }) => theme.colors.mainColor};
      }

      .likes-images {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        img {
          width: 2.8rem;
          height: 2.8rem;
          border-radius: 50%;
          object-fit: cover;

          &:first-child {
            margin-right: 1rem;
          }

          & + img {
            margin-right: -1rem;
          }
        }
      }
    }
  }

  .audio-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${({ theme }) => theme.colors.namesakeText};
    height: 160px;
    border-radius: 4px;
    box-shadow: 0 4px 4px #000;

    .image {
      height: 100%;
      width: 55%;
      img {
        border-radius: 0 4px 4px 0;
        height: 100%;
        width: 100%;
      }

      .interactions {
        opacity: 0;
        pointer-events: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        height: 100%;
        margin-left: 6rem;
        margin-top: -160px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        button {
          font-size: 2rem;
          background: transparent;
          cursor: pointer;
          filter: drop-shadow(1px 1px #000);
          transition: all 0.4s ease-in-out;
          color: ${({ theme }) => theme.colors.namesakeText};
        }
      }

      &:hover,
      &:active,
      &:focus {
        outline: 1px solid ${({ theme }) => theme.colors.mainColor};
        .interactions {
          opacity: 1;
          pointer-events: all;
        }
      }
    }

    .audio-card-content {
      padding: 1rem 2rem;
      padding-top: 1.2rem;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .audio-card-info {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .options {
          margin-right: -2rem;
        }
      }

      .MuiLinearProgress-colorPrimary {
        background: ${({ theme }) => theme.colors.backgroundColor};
      }

      .audio-buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 6rem;
        button {
          margin-left: -10px;
        }
      }

      .duration {
        display: flex;
        justify-content: space-between;
        margin-bottom: -1.2rem;
        margin-top: 1rem;
        font-size: 1.4rem;
      }
    }
  }

  span {
    color: ${({ theme }) => theme.colors.mainColor};
  }

  p {
    color: ${({ theme }) => theme.colors.lightContrast};
    &.music-name {
      font-weight: 700;
      font-size: 2rem;
    }

    &.artist-name {
      font-weight: 400;
      font-size: 1.4rem;
    }
  }

  @media (min-width: 1100px) {
    .audio-card {
      height: 200px;

      .image {
        .interactions {
          opacity: 0;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          height: 100%;
          margin-left: 65%;
          margin-top: -200px;
          cursor: pointer;
          transition: all 0.4s ease-in-out;
          button {
            font-size: 2rem;
            filter: drop-shadow(1px 1px #000);
          }
        }
      }

      .audio-card-content {
        .duration {
          margin-bottom: -0.6rem;
          margin-top: 0;
        }
      }
    }
  }
`;

export default AudioPostContainer;
