import styled from 'styled-components';

export const AuthorInfoContainer = styled.div`
  div {
    margin-left: 2rem;

    p {
      font-size: 1.6rem;
      letter-spacing: 0.1rem;
      color: ${({ theme }) => theme.colors.themeColor};
      white-space: nowrap;
      max-width: 44rem;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 600;
    }

    span {
      display: flex;

      p {
        color: ${({ theme }) => theme.colors.darkGray};
        font-size: 1.3rem;
        letter-spacing: 0.1rem;
        white-space: nowrap;
        max-width: 30rem;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 400;
      }
    }
  }

  a {
    display: flex;
    align-items: center;
    p:hover {
      text-decoration: underline;
      text-decoration-color: inherit;
    }
  }
`;

export const EmptyPostContainer = styled.div`
  color: ${({ theme }) => theme.colors.themeColor};
  background: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  padding: 4rem;
  font-size: 2rem;
  text-align: center;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.colors.mainShadow};

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  /* stylelint-disable-next-line */
  p {
    font-size: 1.6rem;
    margin-top: 2rem;
    margin-bottom: 1rem;

    & .empty-post-title {
      font-size: 2.6rem;
      margin-top: 0;
      margin-bottom: 2rem;
    }
  }

  button {
    margin-top: 2rem;
    background-color: ${({ theme }) => theme.colors.pink};
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.themeColor};
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.4rem;

    div {
      display: flex;
    }

    &:hover {
      div {
        animation: rotateCompass 0.4s ease-in-out infinite alternate;

        @keyframes rotateCompass {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0);
          }
        }
      }
    }
  }
  @media (min-width: 1100px) {
    p {
      width: 60%;

      &.empty-post-title {
        width: 100%;
      }
    }
  }
`;
