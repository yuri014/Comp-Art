import styled from 'styled-components';

export const CommentsSectionContainer = styled.section`
  padding-bottom: 8rem;

  form {
    background: rgba(119, 166, 230, 0.3);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    width: 100%;
    border-top: 1px solid ${({ theme }) => theme.colors.mainColor};
    position: fixed;
    bottom: 0;
    display: grid;
    grid-template-columns: 10% 65% 10%;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    font-size: 2rem;

    img {
      width: 3rem;
      height: 3rem;
      object-fit: cover;
      border-radius: 50%;
    }

    .send-button {
      color: ${({ theme }) => theme.colors.mainColor};
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
  margin-bottom: 2rem;

  .author-image {
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: 1px 2px 4px ${({ theme }) => theme.colors.backgroundColor};
    }
  }

  .comment-interations {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.lightContrast};
    margin-left: 1rem;

    p {
      margin-left: 0.5rem;
      font-weight: 700;
    }
  }

  .comment-body {
    background: ${({ theme }) => theme.colors.secondaryBackgroundColor};
    color: ${({ theme }) => theme.colors.lightContrast};
    border-radius: 4px;
    padding: 1rem;
    box-shadow: 1px 2px 4px ${({ theme }) => theme.colors.backgroundColor};

    a {
      color: ${({ theme }) => theme.colors.lightContrast};
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      font-weight: 700;

      p:last-child {
        color: ${({ theme }) => theme.colors.blueContrast};
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
