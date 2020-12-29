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

  .container {
    width: 90vw;
    max-width: 700px;
  }

  a {
    text-decoration: none;
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
