import styled from 'styled-components';

const LandingContainer = styled.div`
  .start-title {
    position: relative;
    margin-top: 8rem;
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
    display: flex;
    width: 32rem;
    height: 32rem;
    margin: auto;
    margin-top: -8rem;
    & svg {
      width: 100%;
      height: 100%;
    }
  }

  .start-text {
    position: relative;
    width: 70%;
    display: flex;
    margin: auto;
    text-align: justify;
    margin-bottom: 2rem;
    font: 600 16px ${props => props.theme.fonts.primary}, sans-serif;
    filter: blur(0.4px);
    letter-spacing: 1px;
    color: ${props => props.theme.colors.lightContrast};
    text-shadow: 2px 2px 2px ${props => props.theme.colors.namesakeText};
  }

  @media (min-width: 1100px) {
    .start {
      display: grid;
      grid-template-columns: 40% 10% 40%;
      grid-template-rows: 80% 10%;
      grid-template-areas:
        'title . icon'
        'subtitle button icon';
      align-items: center;
      justify-content: center;
    }

    .start-title {
      grid-area: title;
      font-size: 80px;
      letter-spacing: 6px;
      display: block;
    }

    .start-icon {
      grid-area: icon;
      width: 64rem;
      height: 64rem;
      display: flex;
      margin: auto;
      margin-left: -8em;
    }

    .start-text {
      grid-area: subtitle;
      width: 100%;
      margin-top: -12rem;
      padding-right: 16rem;
    }

    .press-start {
      grid-area: button;
      margin: 0;
      width: 16rem;
    }
  }
`;

export default LandingContainer;
