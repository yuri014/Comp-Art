import styled from 'styled-components';

const LandingContainer = styled.div`
  .start-title {
    position: relative;
    margin-top: 8rem;
    display: flex;
    justify-content: center;
    font: 400 6rem 'Audiowide', sans-serif;
    filter: blur(0.4px);
    transform: skewY(-5deg);
    letter-spacing: 4px;
    word-spacing: -8px;
    color: #ffffff;
    text-shadow: 4px 4px 2px ${props => props.theme.colors.title};
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
    font: 600 14px 'Proza Libre', sans-serif;
    filter: blur(0.4px);
    letter-spacing: 1px;
    color: #cbcaeb;
    text-shadow: 2px 2px 2px #1c283b;
  }

  .press-start {
    width: 12rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: auto;
    font: 700 16px 'Audiowide', sans-serif;
    background-color: #1cc5b7;
    border-radius: 4px;
    color: #08162f;
    letter-spacing: 3px;
    transition: filter 1s ease, color 1s ease;
    cursor: pointer;
  }

  .press-start a {
    color: #08162f;
  }

  .press-start:hover {
    color: rgba(3, 4, 71, 0.8);
    filter: drop-shadow(1px 1px 4px #1cc5b7);
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
