import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: ${props => props.theme.colors.secondaryBackgroundColor};
  color: ${props => props.theme.colors.lightContrast};
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 4rem;
  font-size: 18px;
  z-index: 2;

  & a:hover {
    text-decoration: none;
  }

  h1 {
    font: 400 18px ${props => props.theme.fonts.display}, sans-serif;
    filter: blur(0.4px);
    letter-spacing: 4px;
    color: #ffffff;
    text-shadow: 3px 3px 2px ${props => props.theme.colors.titleColor};
  }

  .search-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 32rem;
    & div {
      margin-bottom: 0;
    }
    & button {
      margin-left: 1rem;
      color: ${props => props.theme.colors.mainColor};
      border-radius: 2px;
      border: none;
      font-size: 18px;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    & input {
      color: ${props => props.theme.colors.lightContrast};
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

  span {
    cursor: pointer;
  }

  @media (max-width: 1100px) {
    display: none;
  }
`;

export default HeaderContainer;
