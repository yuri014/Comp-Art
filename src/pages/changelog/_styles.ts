import styled from 'styled-components';

const ChangelogContainer = styled.div`
  padding-bottom: 10rem;

  main {
    background-color: ${({ theme }) => theme.mdxTheme.background};
    color: ${({ theme }) => theme.mdxTheme.normalFont};
    width: 90%;
    max-width: 720px;
    border-radius: 5px;
    padding: 2rem 4rem;
    margin: 0 auto;
    margin-top: 10rem;

    & > * {
      margin-bottom: 2rem;
    }

    h1 {
      font-size: 3.2rem;
      line-height: 4rem;
      border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
    }

    h2 {
      font-size: 2.6rem;
    }

    ul {
      list-style-position: inside;
      margin: 2rem 0;

      li {
        margin-bottom: 1rem;
        font-size: 1.6rem;

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
`;

export default ChangelogContainer;
