import styled from 'styled-components';

const PostPageContainer = styled.div`
  background: ${props => props.theme.colors.mainGradient};
  min-height: 100vh;

  nav {
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${props => props.theme.colors.mainColor};
    padding: 2rem;
    border-bottom: 1px solid ${props => props.theme.colors.mainColor};

    a {
      color: ${props => props.theme.colors.mainColor};
    }
  }

  main {
    padding-bottom: 8rem;
  }

  footer {
    border-top: 1px solid ${props => props.theme.colors.mainColor};
    background: ${props => props.theme.colors.mainGradient};
    position: fixed;
    width: 100%;
    bottom: 0;
    display: grid;
    grid-template-columns: 10% 65% 10%;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    font-size: 2rem;

    img {
      width: 3rem;
      height: 3rem;
      object-fit: cover;
      border-radius: 50%;
    }

    .send-button {
      color: ${props => props.theme.colors.mainColor};
    }
  }
`;

export default PostPageContainer;
