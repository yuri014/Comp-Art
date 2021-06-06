import styled from 'styled-components';

export const MenuListIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0 2rem;
  color: ${({ theme }) => theme.colors.mainColor};
  font-size: 1.3rem;
  background: transparent;
  border: none;
  cursor: pointer;

  p {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.themeColor};
  }
`;

export const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  position: fixed;
  width: 100%;
  top: 0;
  padding: 1rem 4rem;
  font-size: 1.8rem;
  z-index: 3;
  box-shadow: ${({ theme }) => theme.colors.mainShadow};

  display: grid;
  grid-template-columns: 20% 40% 20%;
  align-items: center;
  justify-content: space-between;

  .header-icons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 2rem;

    a {
      color: ${({ theme }) => theme.colors.gray};
    }

    button {
      color: ${({ theme }) => theme.colors.gray};
      padding: 0.5rem;
      font-size: 2rem;
      background: transparent;
      border: none;
      cursor: pointer;

      img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        cursor: pointer;
        object-fit: fill;
      }
    }
  }

  .search-input {
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

      .profile-info {
        display: flex;
        align-items: center;
        color: ${({ theme }) => theme.colors.themeColor};
        width: 100%;
        padding: 1rem 2rem;

        &:hover {
          background-color: ${({ theme }) => theme.colors.popoverBackground};
          filter: brightness(1.25);
        }

        div {
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

        img {
          width: 3.2rem;
          height: 3.2rem;
          border-radius: 50%;
        }
      }
    }
  }

  & a:hover {
    text-decoration: none;
  }

  @media (max-width: 1100px) {
    display: none;
  }
`;
