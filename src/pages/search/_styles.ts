import styled from 'styled-components';

export const SearchPageContainer = styled.div`
  min-height: 100vh;

  main {
    margin-top: 4rem;

    input {
      padding: calc(1.4rem - 1px) 2rem;
      border: 1px solid ${({ theme }) => theme.colors.borderColor};
    }

    .animation-container {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4rem;
    }

    .no-data {
      text-align: center;
      font-size: 1.4rem;
    }
  }
`;

export const SearchContainer = styled.div`
  .profile-results {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};

    .title {
      margin: 2rem 0;
      font-weight: bold;
      font-size: 2rem;
    }

    .profiles-container {
      width: 90%;
    }
  }

  .posts-results {
    margin-top: 3rem;
  }

  @media (min-width: 1100px) {
    .profile-results {
      border-radius: 5px;
    }
  }
`;

// Por alguma razão o nextjs interpreta a falta de um `export default` como um erro.
export default SearchPageContainer;
