import styled from 'styled-components';

export const MenuListIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: ${({ theme }) => theme.colors.mainColor};
  font-size: 1.2rem;

  p {
    font-weight: bold;
    color: #fff;
  }
`;

export const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  color: ${({ theme }) => theme.colors.lightContrast};
  position: fixed;
  width: 100%;
  padding: 1rem 0;
  font-size: 1.8rem;
  z-index: 2;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  & a:hover {
    text-decoration: none;
  }

  p {
    font: 400 2.8rem ${({ theme }) => theme.fonts.display};
    color: ${({ theme }) => theme.colors.themeColor};
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
      width: 40rem;
      height: 100%;
      color: ${({ theme }) => theme.colors.themeColor};

      &:focus {
        padding: calc(1.4rem - 1px) 2rem;
        border: 1px solid #949494;
        outline: none;
      }
    }

    .search-button {
      position: absolute;
      left: 36rem;
      button {
        color: ${({ theme }) => theme.colors.gray};
        font-size: 1.6rem;
      }
    }
  }

  .header-icons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 24rem;

    & img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      cursor: pointer;
      object-fit: fill;
    }
  }

  @media (max-width: 992px) {
    display: none;
  }
`;
