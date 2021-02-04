import styled from 'styled-components';

const LandingContainer = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100vh;

  h1 {
    display: flex;
    justify-content: center;
    font: 400 60px ${props => props.theme.fonts.display}, sans-serif;
    filter: blur(0.4px);
    transform: skewY(-5deg);
    letter-spacing: 4px;
    word-spacing: -8px;
    color: #ffffff;
    text-shadow: 4px 4px 2px ${props => props.theme.colors.titleColor};
  }

  .start-icon {
    svg {
      width: 100%;
      height: 100%;
    }
  }

  h2 {
    width: 80%;
    display: flex;
    margin: auto;
    text-align: justify;
    margin-top: -4rem;
    margin-bottom: 2rem;
    font: 600 16px ${props => props.theme.fonts.primary}, sans-serif;
    filter: blur(0.4px);
    letter-spacing: 1px;
    color: ${props => props.theme.colors.lightContrast};
    text-shadow: 2px 2px 2px ${props => props.theme.colors.namesakeText};
  }

  @media (min-width: 992px) {
    h1 {
      font-size: 120px;
    }

    h2 {
      font-size: 28px;
    }

    .start-button {
      button {
        width: 20rem;
        height: 6rem;
        font-size: 20px;
      }
    }
  }

  @media (min-width: 1200px) {
    padding: 0 8rem;
    max-width: 1278px;
    margin: auto;

    .start {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h1 {
        font-size: 80px;
      }

      .start-icon {
        width: 60%;
        height: 60%;
        margin-right: -15rem;
        svg {
        }
      }
    }

    h2 {
      padding: 0 8rem;
      width: 1278px;
      text-align: left;
      margin-top: -12rem;
      margin-bottom: 4rem;
      font-size: 16px;
      padding-right: 60%;
    }
  }
`;

export default LandingContainer;
