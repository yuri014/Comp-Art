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
    background-color: ${({ theme }) => theme.colors.backgroundColor};
    font-family: ${({ theme }) => theme.fonts.primary};
    color: ${({ theme }) => theme.colors.themeColor};
  }

  button {
    font-family: ${({ theme }) => theme.fonts.primary};
  }

  .container {
    max-width: 1378px;
    margin: 0 auto;
    width: 80%;
  }

  a {
    text-decoration: none;
    width: max-content;
  }

  figure {
    position: relative;
  }

  .soundcloud-icon {
    color: #FF5500;
  }

  .twitter-icon {
    color: #1DA1F2;
  }

  .wattpad-icon {
    color: #FF6122;
  }

  .facebook-icon {
    color: #4267B2;
  }

  .pinterest-icon {
    color: #C8232C;
  }

  .bandcamp-icon {
    color: white;
    background-color: #629AA9;
    border-radius: 50%;
  }

  .deviantart-icon {
    color: #00E59B;
  }

  .primary-icon {
    color: ${({ theme }) => theme.colors.mainColor};
  }

  .secondary-icon {
    color: ${({ theme }) => theme.colors.lightContrast};
  }

  .danger-icon {
    color: ${({ theme }) => theme.colors.error};
  }

  .holder {
    background: ${({ theme }) => theme.colors.mainColor};
    width: 100%;
    height: 100%;
  }

  .limited-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  #nprogress .bar {
  background: ${({ theme }) => theme.colors.mainColor};
  }

  #nprogress .spinner-icon {
    border-top-color: ${({ theme }) => theme.colors.mainColor};
    border-left-color: ${({ theme }) => theme.colors.mainColor};
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.lightContrast};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.mainColor};
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
