import styled from 'styled-components';

export const MenuListIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0 2rem;
  color: ${({ theme }) => theme.colors.mainColor};
  font-size: 1.2rem;

  p {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.themeColor};
  }
`;

export const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  position: fixed;
  width: 100%;
  padding: 1rem 4rem;
  font-size: 1.8rem;
  z-index: 2;
  box-shadow: ${({ theme }) => theme.colors.mainShadow};

  display: grid;
  grid-template-columns: 20% 40% 20%;
  align-items: center;
  justify-content: space-between;

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
      background-color: #0e0b21;
      width: 100%;
      padding: 1rem 2rem;
      color: ${({ theme }) => theme.colors.themeColor};
      border-radius: 5px;
      top: 4.6rem;

      .profile-info {
        display: flex;
        align-items: center;
        color: ${({ theme }) => theme.colors.themeColor};

        div {
          display: flex;
          margin-left: 1rem;
          align-items: flex-start;
          flex-direction: column;

          strong {
            font-size: 1.4rem;
          }

          p {
            font-size: 1.1rem;
            color: ${({ theme }) => theme.colors.gray};
          }
        }

        img {
          width: 3.2rem;
          height: 3.2rem;
          border-radius: 50%;
        }

        & + .profile-info {
          margin-top: 1rem;
        }
      }
    }
  }

  .header-icons {
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
      color: ${({ theme }) => theme.colors.gray};
    }

    button {
      padding: 0.2rem;

      img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        cursor: pointer;
        object-fit: fill;
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
