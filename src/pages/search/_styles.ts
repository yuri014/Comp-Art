import styled from 'styled-components';

export const SearchPageContainer = styled.div``;

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
