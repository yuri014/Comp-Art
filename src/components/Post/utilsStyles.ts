import styled from 'styled-components';

export const AuthorInfoContainer = styled.div`
  p {
    color: ${({ theme }) => theme.colors.darkGray};
    font-size: 1.3rem;
    margin-left: 1rem;
  }

  .author-image {
    width: 5rem;
    height: 5rem;

    p {
      color: unset;
      margin: 0;
      font-size: 2.2rem;
    }
  }

  .author {
    margin-left: 1rem;
    display: flex;
    align-items: center;
    font-size: 1.5rem;

    strong {
      letter-spacing: 0.1rem;
      color: ${({ theme }) => theme.colors.themeColor};
      white-space: nowrap;
      max-width: 14rem;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 600;

      @media (min-width: 768px) {
        max-width: 30rem;
      }
    }

    p {
      color: ${({ theme }) => theme.colors.darkGray};
      letter-spacing: 0.1rem;
      white-space: nowrap;
      max-width: 10rem;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 400;
      margin-left: 0.5rem;

      @media (min-width: 768px) {
        max-width: 18rem;
      }
    }

    strong,
    p {
      &:hover {
        text-decoration: underline;
        text-decoration-color: inherit;
      }
    }
  }

  a {
    display: flex;
    align-items: center;
  }
`;

export const InteractionsNumbersContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  /* stylelint-disable-next-line */
  p {
    font-size: 1.3rem;
    text-align: center;
  }

  a {
    color: ${({ theme }) => theme.colors.themeColor};
  }

  button {
    color: ${({ theme }) => theme.colors.themeColor};
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: unset;

    &:focus {
      outline: 1px solid ${({ theme }) => theme.colors.mainColor};
    }

    .likes-images {
      display: flex;
      align-items: center;
      margin-right: 1.8rem;

      .like-profile-image {
        width: 2.4rem;
        height: 2.4rem;
        margin-right: -1.4rem;

        img {
          object-fit: cover;
          position: relative;
        }

        p {
          margin: 0;
          font-size: 1.3rem;
        }
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

  /* stylelint-disable-next-line */
  button {
    margin-top: 2rem;
    background-color: ${({ theme }) => theme.colors.pink};
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    font-size: 1.4rem;
    color: #fff;
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
