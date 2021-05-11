import styled from 'styled-components';

export const CreatePostContainer = styled.div`
  color: ${({ theme }) => theme.colors.lightContrast};
  width: 90%;
  margin: 0 auto;
  & form {
    background: ${({ theme }) => theme.colors.mainGradient};
    padding: 2rem;
    border-radius: 0 0 4px 4px;
    display: flex;
    flex-direction: column;
    & h2 {
      font-size: 2.4rem;
      margin-bottom: 1rem;
      text-align: center;
    }
  }

  & svg {
    color: ${({ theme }) => theme.colors.lightContrast};
  }

  & .file-label {
    margin-top: 1rem;
    width: 100%;
    height: 100%;
    max-height: 300px;
    border-radius: 2px;
    cursor: pointer;
    border: 1px dashed ${({ theme }) => theme.colors.lightContrast};
    & input {
      display: none;
    }

    & img {
      width: 100%;
      height: 100%;
      max-height: 298px;
      border-radius: 2px;
    }

    & .drop-file {
      width: 100%;
      height: 100%;
      padding: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      & p {
        font-size: 1.4rem;
      }
    }
  }

  & .publish {
    margin-top: 2rem;
    & button {
      width: 16rem;
      & svg {
        color: ${({ theme }) => theme.colors.namesakeText};
      }
    }
  }

  @media (min-width: 1100px) {
    width: 50%;

    & .file-label {
      max-height: 432px;
      & img {
        max-height: 430px;
      }
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

  .empty-post-title {
    font-size: 2.6rem;
    margin-top: 0;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.6rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
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
    .empty-post-title {
      width: 100%;
    }

    p {
      width: 60%;
    }
  }
`;

export const AuthorInfoContainer = styled.div`
  a {
    display: flex;
    align-items: center;
    p:hover {
      text-decoration: underline;
      text-decoration-color: inherit;
    }
  }

  div {
    margin-left: 2rem;

    p {
      font-size: 2.4rem;
      letter-spacing: 0.1rem;
      color: ${({ theme }) => theme.colors.themeColor};
      white-space: nowrap;
      max-width: 44rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    span {
      display: flex;

      p {
        color: ${({ theme }) => theme.colors.darkGray};
        font-size: 1.4rem;
        letter-spacing: 0.1rem;
        white-space: nowrap;
        max-width: 30rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;
