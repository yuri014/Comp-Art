import styled from 'styled-components';

const PostPageContainer = styled.div`
  background: ${({ theme }) => theme.colors.mainGradient};
  min-height: 100vh;

  .profile {
    display: none;
  }

  nav {
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme.colors.mainColor};
    padding: 0 2rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.mainColor};

    a {
      color: ${({ theme }) => theme.colors.mainColor};
    }
  }

  @media (min-width: 992px) {
    max-width: 1378px;
    margin: 0 auto;
    width: 60%;
    background: ${({ theme }) => theme.colors.mainGradient};
  }
`;

export default PostPageContainer;
