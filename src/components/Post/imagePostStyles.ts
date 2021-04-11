import styled from 'styled-components';

const PostContainer = styled.section`
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
export default PostContainer;
