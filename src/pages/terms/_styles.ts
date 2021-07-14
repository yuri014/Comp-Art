import styled from 'styled-components';

const TermsContainer = styled.div`
  padding: 4rem 0;

  main {
    h1 {
      font-size: 4.8rem;
    }

    h2 {
      font-size: 2.4rem;
    }

    h3 {
      font-size: 2rem;
    }

    h2,
    h3 {
      margin: 1rem 0;
    }

    p,
    li {
      font-size: 1.6rem;
    }

    ol {
      list-style-position: inside;
      margin: 2rem 0;

      li {
        margin-bottom: 1rem;

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
`;

export default TermsContainer;
