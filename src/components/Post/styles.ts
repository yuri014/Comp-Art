import styled from 'styled-components';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.themeColor};
  background: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  padding: 1rem;
  font-size: 1.8rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  box-shadow: ${({ theme }) => theme.colors.mainShadow};
  margin-bottom: 4rem;

  .post-author {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .author-info {
      display: flex;
      align-items: center;

      a {
        p:hover {
          text-decoration: underline;
          text-decoration-color: inherit;
        }
      }

      div {
        margin-left: 2rem;

        p {
          font-size: 2.4rem;
          letter-spacing: 0.1rem;
          color: ${({ theme }) => theme.colors.themeColor};
          white-space: nowrap;
          max-width: 44rem;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        span {
          display: flex;

          p {
            color: ${({ theme }) => theme.colors.darkGray};
            font-size: 1.4rem;
            letter-spacing: 0.1rem;
            white-space: nowrap;
            max-width: 30rem;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }

    img {
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
      object-fit: fill;
    }
  }

  .post {
    margin: 1rem 0 1rem 0;
    .post-description {
      margin: 1rem 0 1rem 0;
      max-width: 100%;

      p {
        overflow: hidden;
        max-width: 700px;
      }
    }

    .post-info {
      .share-count {
        display: none;
      }

      .post-counts {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 0.6rem;

        button {
          color: ${({ theme }) => theme.colors.themeColor};
          background: transparent;
          border: none;
          cursor: pointer;
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
              width: 2.4rem;
              height: 2.4rem;
              border-radius: 50%;
              object-fit: cover;

              &:first-child {
                margin-right: 0.4rem;
              }

              & + img {
                margin-right: -1.6rem;
              }
            }
          }
        }
      }

      p {
        font-size: 1.2rem;
      }
    }

    .publish-date {
      font-size: 1.1rem;
      padding-top: 1rem;
      margin-top: 1rem;
      border-top: 1px solid #3e3e3e;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .post-interaction {
      padding-top: 1rem;
      margin-top: 1rem;
      font-size: 2.4rem;
      border-top: 1px solid #3e3e3e;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .interaction-group {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }

      button {
        color: ${({ theme }) => theme.colors.darkGray};
        border: none;
        background-color: transparent;
        cursor: pointer;
        padding: 1rem;
        font-size: 2.4rem;
        transition: all 0.4s ease-in-out;
        display: flex;
        align-items: center;
        border-radius: 5px;

        &:hover {
          background: ${({ theme }) => theme.colors.lighterSecondaryBackground};
        }

        .interactions-button {
          display: flex;
          align-items: center;

          p {
            font-size: 1.4rem;
            margin-left: 1rem;
          }
        }

        p {
          font-size: 1.6rem;
          margin-left: 1rem;
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

        &.bookmark {
          display: none;
        }
      }
    }
  }

  @media (min-width: 768px) {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 2rem;
    padding: 4rem;
    border-radius: 5px;

    .post {
      .post-info {
        display: flex;
        align-items: center;
        justify-content: space-between;

        p {
          font-size: 1.2rem;
        }

        .share-count {
          display: unset;

          &-mobile {
            display: none;
          }
        }

        .post-counts {
          width: 43rem;

          @media (min-width: 1100px) {
            width: 39rem;
          }
        }

        .publish-date {
          border-top: none;
          padding: 0;
          margin-top: 0;
        }
      }

      .post-interaction {
        .interaction-group {
          width: 43rem;

          @media (min-width: 1100px) {
            width: 39rem;
          }
        }

        button {
          .interactions-button {
            p {
              font-size: 1.4rem;
            }
          }

          &.bookmark {
            display: unset;
          }
        }
      }
    }
  }

  @media (min-width: 1100px) {
    padding: 2rem;
    width: 100%;
  }
`;

export default PostContainer;
