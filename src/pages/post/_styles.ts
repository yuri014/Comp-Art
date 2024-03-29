import styled from 'styled-components';

const PostPageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  min-height: 100vh;

  main {
    .profile {
      padding: 1rem calc(2rem - 6px);
      display: flex;

      .author-info {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 1rem;

        .author-image {
          width: 4rem;
          height: 4rem;
        }

        a {
          font-size: 1.5rem;
          color: ${({ theme }) => theme.colors.themeColor};

          p {
            color: ${({ theme }) => theme.colors.darkGray};
            font-size: 1.3rem;
          }

          div {
            display: flex;
            gap: 0.5rem;

            p {
              font-size: 1.5rem;
            }

            strong,
            p {
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }

    .description {
      padding: 0 2rem;
      padding-bottom: 1rem;
    }

    .post {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 0 calc(2rem - 6px);

      .post-image {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          border-radius: 5px;
        }
      }
    }

    .interactions-numbers {
      padding: 0 calc(2rem);
      width: 100%;
    }

    .interactions {
      border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
      padding: 0 calc(2rem - 6px);
      .bookmark {
        display: flex;
      }
    }
  }

  @media (min-width: 992px) {
    header {
      position: absolute;
      width: 68%;

      nav {
        border-right: 1px solid ${({ theme }) => theme.colors.borderColor};
      }
    }

    main {
      display: grid;
      grid-template-columns: 68% 32%;
      grid-template-rows: max-content;
      grid-template-areas:
        'post author'
        'post comments';

      .description {
        padding-top: 1rem;
        padding-bottom: 0;
      }

      .post {
        height: calc(100vh - 5rem);
        padding: 0 2rem;
        margin-top: 5rem;
        grid-area: post;
        border-right: 1px solid ${({ theme }) => theme.colors.borderColor};
        display: flex;
        place-items: center;

        .post-text {
          height: 50rem;
          padding: 1rem 0;
          overflow-y: scroll;
        }

        .post-image {
          width: auto;
          height: 95%;

          img {
            width: inherit;
            height: inherit;
            border-radius: 5px;
          }
        }
      }

      #author {
        padding: 1rem 0;
        grid-area: author;
      }

      #comments {
        grid-area: comments;
      }
    }
  }

  @media (min-width: 1025px) {
    header {
      width: 70%;
    }

    main {
      grid-template-columns: 70% 30%;
    }
  }
`;

export default PostPageContainer;
