import styled from 'styled-components';

const PostPageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  min-height: 100vh;

  header {
    nav {
      height: 5rem;
      font-size: 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${({ theme }) => theme.colors.mainColor};
      padding: 0 calc(1rem - 6px);
      width: 100%;
      background: ${({ theme }) => theme.colors.alternativeBackground};
      border-bottom: 1px solid ${({ theme }) => theme.colors.inputBackground};

      a {
        color: ${({ theme }) => theme.colors.mainColor};
      }
    }
  }

  main {
    .profile {
      padding: 1rem calc(2rem - 6px);
      display: flex;
      gap: 1rem;

      img {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
      }

      a {
        font-size: 1.5rem;

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
        }
      }
    }

    .description {
      padding: 0 calc(2rem - 6px);
      padding-bottom: 1rem;
    }

    .post {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 0 calc(2rem - 6px);

      .post-image {
        width: 100%;

        img {
          width: inherit;
          border-radius: 5px;
        }
      }
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
      width: 70%;
    }

    main {
      display: grid;
      grid-template-columns: 70% 30%;
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
        padding: 0;
        margin-top: 5rem;
        grid-area: post;
        border-right: 1px solid ${({ theme }) => theme.colors.borderColor};
        display: flex;
        place-items: center;
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
`;

export default PostPageContainer;
