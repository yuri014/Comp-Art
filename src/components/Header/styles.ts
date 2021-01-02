import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.namesakeText};
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 4rem;
  font-size: 18px;

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
    }
  }

  span {
    cursor: pointer;
  }
`;

export default HeaderContainer;
