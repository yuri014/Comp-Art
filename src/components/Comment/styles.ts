import styled from 'styled-components';

export const CommentsSectionContainer = styled.section`
  padding-bottom: 8rem;

  form {
    width: 100%;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    font-size: 2rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

    img {
      width: 3rem;
      height: 3rem;
      object-fit: cover;
      border-radius: 50%;
    }

    .DraftEditor-root {
      width: 70%;
      font-size: 1.3rem;
      background: ${({ theme }) => theme.colors.lighterSecondaryBackground};
      padding: 0.8rem 1rem;
      border-radius: 3rem;
    }

    button {
      background: transparent;
      color: ${({ theme }) => theme.colors.mainColor};
      border: none;
      font-size: 3rem;
      height: 3rem;

      &:disabled {
        color: ${({ theme }) => theme.colors.gray};
      }
    }
  }

  @media (min-width: 1100px) {
    width: 100%;
    margin: 0 auto;
    margin-top: 4rem;
    max-height: 100%;
    max-height: 65vh;
    overflow-y: scroll;
    padding-bottom: 0;

    form {
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

export const CommentContainer = styled.div`
  display: grid;
  grid-template-columns: 10% 88%;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 2rem;
  margin: 2rem 0;

  .author-image {
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: ${({ theme }) => theme.colors.mainShadow};
    }
  }

  .comment-interations {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.darkGray};
    margin-left: 1rem;
    gap: 1rem;

    div {
      display: flex;
      align-items: center;
    }

    .like {
      color: ${({ theme }) => theme.colors.darkGray};
      display: flex;
      align-items: center;
      background: none;
      border: none;
    }

    p {
      margin-left: 0.5rem;
      font-weight: 700;
    }
  }

  .comment-body {
    background: ${({ theme }) => theme.colors.commentBackground};
    color: ${({ theme }) => theme.colors.themeColor};
    border-radius: 4px;
    padding: 1rem;
    box-shadow: ${({ theme }) => theme.colors.mainShadow};

    a {
      color: ${({ theme }) => theme.colors.themeColor};
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      font-weight: 700;

      p:last-child {
        color: ${({ theme }) => theme.colors.darkGray};
        font-weight: 400;
        margin-left: 0.5rem;
      }
    }

    .comment-text {
      margin-top: 1rem;
      font-size: 1.5rem;
    }
  }

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;

    max-width: 350px;

    .comment-body {
      max-width: 250px;
    }

    .author-image {
      img {
        width: 4rem;
        height: 4rem;
      }
    }
  }

  @media (min-width: 1100px) {
    max-width: 100%;
    display: grid;
    grid-template-columns: 5% 92%;

    .comment-body {
      max-width: unset;
      width: 100%;
    }
  }
`;
