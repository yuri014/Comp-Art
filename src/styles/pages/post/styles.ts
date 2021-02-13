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
    padding: 2rem;
    border-bottom: 1px solid ${props => props.theme.colors.mainColor};

    a {
      color: ${props => props.theme.colors.mainColor};
    }
  }

  .comments {
    padding-bottom: 8rem;
  }

  footer {
    background: rgba(119, 166, 230, 0.3);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    width: 100%;
    border-top: 1px solid ${props => props.theme.colors.mainColor};
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

  @media (min-width: 992px) {
    max-width: 1378px;
    margin: 0 auto;
    width: 60%;
    background: ${props => props.theme.colors.mainGradient};

    .comments {
      width: 100%;
      margin: 0 auto;
      margin-top: 4rem;
      max-height: 100%;
      max-height: 65vh;
      overflow-y: scroll;
      padding-bottom: 0;
    }

    footer {
      border-top: 0;
      background: rgba(119, 166, 230, 0.3);
      backdrop-filter: blur(4px);
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      position: sticky;
      width: 100%;
    }
  }
`;

export default PostPageContainer;
