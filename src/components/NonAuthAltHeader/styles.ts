import styled from 'styled-components';

const NonAuthAltHeaderContainer = styled.header`
  nav {
    height: 5rem;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme.colors.mainColor};
    padding: 0 calc(1rem - 6px);
    width: 100%;
    background: ${({ theme }) => theme.colors.alternativeBackground};
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

    a {
      color: ${({ theme }) => theme.colors.mainColor};
    }
  }
`;

export default NonAuthAltHeaderContainer;
