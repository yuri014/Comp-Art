import styled from 'styled-components';

const PostPageContainer = styled.div`
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
    .post-container {
      display: flex;
      justify-content: center;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
      padding: 2rem 1rem;
      border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
    }
  }
`;

export default PostPageContainer;
