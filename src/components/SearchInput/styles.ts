import styled from 'styled-components';

const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    padding: 1.4rem 2rem;
    background-color: ${({ theme }) => theme.colors.backgroundColor};
    border: none;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.colors.themeColor};
    box-shadow: ${({ theme }) => theme.colors.secondaryShadow};

    &:focus {
      padding: calc(1.4rem - 1px) 2rem;
      border: 1px solid #949494;
      outline: none;
    }
  }

  .search-button {
    position: absolute;
    left: calc(100% - 4.6rem);
    button {
      color: ${({ theme }) => theme.colors.gray};
      font-size: 1.6rem;
    }
  }

  .search-results {
    position: absolute;
    background-color: ${({ theme }) => theme.colors.popoverBackground};
    width: 100%;
    padding: 0.5rem 0;
    color: ${({ theme }) => theme.colors.themeColor};
    border-radius: 5px;
    top: 4.6rem;
    z-index: 9;

    .profile-info {
      display: flex;
      align-items: center;
      color: ${({ theme }) => theme.colors.themeColor};
      width: 100%;
      padding: 1rem 2rem;

      .profile-info-image {
        width: 3.2rem;
        height: 3.2rem;

        p {
          font-size: 1.6rem;
        }
      }

      &:hover {
        background-color: ${({ theme }) => theme.colors.popoverBackground};
        filter: brightness(1.25);
      }

      .profile-info-content {
        display: flex;
        margin-left: 1rem;
        align-items: flex-start;
        flex-direction: column;

        strong {
          font-size: 1.4rem;
        }

        p {
          font-weight: 300;
          font-size: 1.3rem;
          color: ${({ theme }) => theme.colors.darkGray};
        }
      }
    }
  }
`;

export default SearchInputContainer;
