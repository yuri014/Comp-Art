import styled from 'styled-components';

const SearchContainer = styled.div`
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

  @media (min-width: 1100px) {
    padding: 0 2rem;

    .profile-results {
      border-radius: 5px;
    }
  }
`;

export default SearchContainer;
