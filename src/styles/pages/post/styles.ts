import styled from 'styled-components';

const PostPageContainer = styled.div`
  background: ${props => props.theme.colors.mainGradient};
  min-height: 100vh;

  .profile {
    display: none;
  }

  nav {
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${props => props.theme.colors.mainColor};
    padding: 0 2rem;
    border-bottom: 1px solid ${props => props.theme.colors.mainColor};

    a {
      color: ${props => props.theme.colors.mainColor};
    }
  }

  @media (min-width: 992px) {
    max-width: 1378px;
    margin: 0 auto;
    width: 60%;
    background: ${props => props.theme.colors.mainGradient};
  }
`;

export default PostPageContainer;
