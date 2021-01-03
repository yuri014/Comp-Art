import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
  font-size: 60%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    background-color: ${props => props.theme.colors.backgroundColor};
  }

  a {
    text-decoration: none;
  }

  .main-title {
    position: static;
    margin-top: 8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font: 400 40px ${props => props.theme.fonts.display}, sans-serif;
    filter: blur(0.4px);
    transform: skewY(-5deg);
    letter-spacing: 4px;
    word-spacing: -8px;
    color: #ffffff;
    text-shadow: 4px 4px 2px ${props => props.theme.colors.titleColor};
  }

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: ${props => props.theme.colors.secondaryBackgroundColor};
}

::-webkit-scrollbar-thumb {
  background: ${props => props.theme.colors.lightContrast};
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: ${props => props.theme.colors.mainColor};
}

  @media (min-width: 768px) {
    :root {
      font-size: 62.5%;
    }
    body {
      overflow-x: hidden;
    }
  }
`;
