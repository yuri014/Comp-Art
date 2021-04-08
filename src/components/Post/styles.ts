import styled from 'styled-components';

export const PostContainer = styled.section`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.lightContrast};
  background: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  border-radius: 4px;
  padding: 2rem 3rem;
  font-size: 1.8rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  box-shadow: 0 0 6px #000;
  margin-bottom: 4rem;

  &.full-post {
    box-shadow: none;
    background: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightContrast};
    border-radius: 0;

    .post-config {
      margin-right: -2rem;
    }
  }

  .post-author {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .author-info {
      display: flex;
      align-items: center;
      div {
        margin-left: 2rem;

        p {
          font-size: 2.4rem;
          letter-spacing: 1px;
          margin-bottom: 0.4rem;
          color: ${({ theme }) => theme.colors.lightContrast};
          white-space: nowrap;
          max-width: 440px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span {
          display: flex;
          p {
            margin-top: 0.4rem;
            color: ${({ theme }) => theme.colors.blueContrast};
            font-size: 1.4rem;
            letter-spacing: 1px;
            white-space: nowrap;
            max-width: 300px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: fill;
    }
  }

  .post {
    .post-description {
      margin: 2rem 0 1rem 0;
      max-width: 100%;

      p {
        overflow: hidden;
        max-width: 700px;
      }
    }

    button {
      display: block;
      background-color: transparent;
      border: none;
      padding: 0;

      &.image-button {
        width: 100%;
      }

      .post-image {
        cursor: pointer;
        margin: 2rem 0;
        width: 100%;
        height: 432px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 4px;
          object-fit: cover;
        }
      }
    }

    .post-counts {
      button {
        color: ${({ theme }) => theme.colors.lightContrast};
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 1.6rem;
        display: flex;
        align-items: center;
        width: unset;

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

    .post-interaction {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      padding-top: 1rem;
      margin-top: 1rem;
      font-size: 2.4rem;
      border-top: 2px solid ${({ theme }) => theme.colors.lightContrast};
      & button {
        color: ${({ theme }) => theme.colors.lightContrast};
        border: none;
        background-color: transparent;
        cursor: pointer;
        padding: 1rem 0;
        font-size: 2.4rem;
        transition: all 0.4s ease-in-out;
        display: flex;
        align-items: center;

        & p {
          font-size: 1.6rem;
          margin-left: 1rem;
        }

        &:hover {
          filter: brightness(140%);
        }

        &:focus {
          outline: none;
          color: ${({ theme }) => theme.colors.mainColor};
        }

        &.active {
          opacity: 1;
          color: ${({ theme }) => theme.colors.mainColor};
          svg {
            transform: scale(0);
            animation: liked 0.4s ease-in-out forwards;
            @keyframes liked {
              from {
                transform: scale(0);
              }
              to {
                transform: scale(1);
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 769px) {
    padding: 2rem;

    .post-author {
      .author-info {
        div {
          p {
            max-width: 160px;
          }
          span {
            display: flex;
            p {
              max-width: 80px;
            }
          }
        }
      }
    }

    .post {
      .post-image {
        height: 232px;
      }

      & .post-interaction {
        padding: 0;
        & button {
          padding: 1rem 2rem;
        }
      }
    }
  }

  @media (max-width: 1100px) {
    .post {
      .post-image {
        height: 332px;
      }
    }
  }
`;

export const CreatePostContainer = styled.div`
  color: ${({ theme }) => theme.colors.lightContrast};
  width: 90%;
  margin: 0 auto;
  & form {
    background: ${({ theme }) => theme.colors.mainGradient};
    padding: 2rem;
    border-radius: 0 0 4px 4px;
    display: flex;
    flex-direction: column;
    & h2 {
      font-size: 2.4rem;
      margin-bottom: 1rem;
      text-align: center;
    }
  }

  & svg {
    color: ${({ theme }) => theme.colors.lightContrast};
  }

  & .file-label {
    margin-top: 1rem;
    width: 100%;
    height: 100%;
    max-height: 300px;
    border-radius: 2px;
    cursor: pointer;
    border: 1px dashed ${({ theme }) => theme.colors.lightContrast};
    & input {
      display: none;
    }

    & img {
      width: 100%;
      height: 100%;
      max-height: 298px;
      border-radius: 2px;
    }

    & .drop-file {
      width: 100%;
      height: 100%;
      padding: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      & p {
        font-size: 1.4rem;
      }
    }
  }

  & .publish {
    margin-top: 2rem;
    & button {
      width: 16rem;
      & svg {
        color: ${({ theme }) => theme.colors.namesakeText};
      }
    }
  }

  @media (min-width: 1100px) {
    width: 50%;

    & .file-label {
      max-height: 432px;
      & img {
        max-height: 430px;
      }
    }
  }
`;

export const EmptyPostContainer = styled.div`
  color: ${({ theme }) => theme.colors.themeColor};
  background: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  padding: 4rem;
  font-size: 2rem;
  text-align: center;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.colors.mainShadow};

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  .empty-post-title {
    font-size: 2.6rem;
    margin-top: 0;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.6rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  button {
    margin-top: 2rem;
    background-color: ${({ theme }) => theme.colors.pink};
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.themeColor};
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.4rem;

    div {
      display: flex;
    }

    &:hover {
      div {
        animation: rotateCompass 0.4s ease-in-out infinite alternate;

        @keyframes rotateCompass {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0);
          }
        }
      }
    }
  }
  @media (min-width: 1100px) {
    .empty-post-title {
      width: 100%;
    }

    p {
      width: 60%;
    }
  }
`;

export const AudioPostContainer = styled.section`
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
