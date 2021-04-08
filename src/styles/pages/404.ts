import styled from 'styled-components';

const Custom404Container = styled.main`
  height: 100vh;
  color: ${({ theme }) => theme.colors.lightContrast};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    position: relative;
    text-align: center;
    width: 80%;
    font: 400 32px ${({ theme }) => theme.fonts.display}, sans-serif;
    filter: blur(0.4px);
    transform: skewY(-5deg);
    letter-spacing: 4px;
    word-spacing: -8px;
    color: ${({ theme }) => theme.colors.themeColor};
    text-shadow: 4px 4px 2px ${({ theme }) => theme.colors.titleColor};
  }

  @media (min-width: 1100px) {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    h1 {
      width: 40%;
      font-size: 48px;
    }
  }
`;

export default Custom404Container;
