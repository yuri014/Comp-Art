import styled from 'styled-components';

const ResponseContainer = styled.div`
  @media (min-width: 768px) {
    .animation {
      margin: 0 auto;
      max-height: 350px;
      max-width: 350px;
    }
  }

  span,
  a {
    color: ${({ theme }) => theme.colors.mainColor};
  }

  p,
  a {
    text-align: center;
    margin-bottom: 0.5rem;
    font-size: 1.4rem;
  }

  .attribution {
    margin-top: 2rem;
    width: 100%;
    display: flex;

    p {
      text-align: left;
    }

    a {
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default ResponseContainer;
