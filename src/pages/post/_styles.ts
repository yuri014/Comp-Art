import styled from 'styled-components';

const PostPageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  min-height: 100vh;

  header {
    nav {
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
    }

    .post-container {
      display: flex;
      justify-content: center;
      width: 100%;
      padding: 2rem 1rem;
      border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
    }
  }
`;

export default PostPageContainer;
