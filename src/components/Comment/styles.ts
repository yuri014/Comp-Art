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
      cursor: pointer;

      &:disabled {
        color: ${({ theme }) => theme.colors.gray};
      }
    }
  }

  @media (min-width: 1100px) {
    width: 100%;
    margin: 0 auto;
    max-height: 72vh;
    overflow-y: scroll;
    padding-bottom: 0;
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
      box-shadow: ${({ theme }) => theme.colors.mainShadow};
    }
  }

  .comment-interations {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    font-size: 1.3rem;
    margin-right: 1rem;
    justify-content: flex-end;
    color: ${({ theme }) => theme.colors.darkGray};
    gap: 1rem;

    div {
      display: flex;
      align-items: center;
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
    position: relative;

    .menu-comment {
      position: absolute;
      top: 1rem;
      right: 1rem;

      button {
        cursor: pointer;
        border: none;
        border-radius: 5px;
        padding: 0.2rem 0.4rem;
        color: ${({ theme }) => theme.colors.darkGray};
        background: ${({ theme }) => theme.colors.commentBackground};

        &:hover {
          filter: brightness(1.2);
        }
      }
    }

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

    .likes {
      border: none;
      color: white;
      cursor: pointer;
      position: absolute;
      right: 1rem;
      bottom: -1rem;
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background-color: ${({ theme }) => theme.colors.pink};
      padding: 0.4rem 0.7rem;
      border-radius: 5px;
    }
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 5% 92%;

    .comment-body {
      width: 100%;
    }

    .author-image {
      img {
        width: 4rem;
        height: 4rem;
      }
    }
  }

  @media (min-width: 992px) {
    grid-template-columns: 5% 85%;
  }
`;
