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

  & a:hover {
    text-decoration: none;
  }

  @media (max-width: 1100px) {
    display: none;
  }
`;
