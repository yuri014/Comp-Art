import styled from 'styled-components';

const PostPageContainer = styled.div`
  background: linear-gradient(
      180deg,
      ${props => props.theme.colors.secondaryBackgroundColor} 0%,
      ${props => props.theme.colors.namesakeText} 100%
    ),
    ${props => props.theme.colors.secondaryBackgroundColor};
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
      object-fit: fill;
      border-radius: 50%;
    }

    .send-button {
      color: ${props => props.theme.colors.mainColor};
    }
  }
`;

export default PostPageContainer;
