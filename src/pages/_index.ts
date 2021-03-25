import styled from 'styled-components';

const LandingContainer = styled.div`
  width: 80%;

  main {
    display: flex;
    height: 80vh;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    color: ${props => props.theme.colors.themeColor};

    h1 {
      text-align: center;
      font-family: ${props => props.theme.fonts.display};
      font-size: 5rem;
      letter-spacing: 0.2rem;
    }

    h2 {
      font-size: 2rem;
      text-align: center;
    }

    section {
      svg {
        width: 100%;
        height: 100%;
        margin: -2rem 0;
      }

      p {
        font-size: 1.6rem;
        text-align: center;
        margin: 2rem 0;
      }
    }
  }

  footer {
    display: flex;
    margin-top: 8rem;
    align-items: center;
    justify-content: space-between;
    bottom: 4rem;
    font-size: 1.8rem;

    a {
      color: ${props => props.theme.colors.themeColor};
    }

    svg {
      color: ${props => props.theme.colors.themeColor};
      font-size: 2.6rem;
    }
  }
`;

export default LandingContainer;
