import styled from 'styled-components';

export const PostContainer = styled.section`
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.colors.lightContrast};
  background: ${props => props.theme.colors.secondaryBackgroundColor};
  border-radius: 4px;
  padding: 2rem 3rem;
  font-size: 18px;
  font-family: ${props => props.theme.fonts.primary};
  box-shadow: 0 0 6px #000;
  margin-bottom: 4rem;

  .post-author {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & .author-info {
      display: flex;
      align-items: center;
      & div {
        margin-left: 2rem;

        & h4 {
          font-size: 24px;
          letter-spacing: 1px;
          margin-bottom: 0.4 rem;
          color: ${props => props.theme.colors.lightContrast};
          white-space: nowrap;
          max-width: 440px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        & span {
          display: flex;
          & p {
            margin-top: 0.4rem;
            color: ${props => props.theme.colors.lightText};
            font-size: 14px;
            letter-spacing: 1px;
            white-space: nowrap;
            max-width: 300px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
    & figure {
      width: 60px;
      height: 60px;
      & img {
        border-radius: 50%;
        object-fit: fill;
      }
    }
  }

  .post {
    & .post-description {
      margin: 2rem 0 1rem 0;
    }

    .post-image {
      margin: 2rem 0;
      width: 100%;
      height: 432px;
      & img {
        border-radius: 4px;
        object-fit: cover;
      }
    }

    & .post-interaction {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      padding-top: 1rem;
      margin-top: 1rem;
      font-size: 24px;
      border-top: 2px solid ${props => props.theme.colors.lightContrast};
      & div {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 0;
        & p {
          font-size: 16px;
          margin-left: 1rem;
        }
      }
    }
  }

  @media (max-width: 1100px) {
    padding: 2rem;

    .post-author {
      & .author-info {
        & div {
          & h4 {
            max-width: 160px;
          }
          & span {
            display: flex;
            & p {
              max-width: 80px;
            }
          }
        }
      }
    }

    .post {
      .post-image {
        height: 232px;
      }

      & .post-interaction {
        padding: 0;
        & div {
          padding: 1rem 2rem;
          & p {
            display: none;
          }
        }
      }
    }
  }
`;

export const CreatePostContainer = styled.div`
  padding: 8rem 0;
  color: ${props => props.theme.colors.lightContrast};
  width: 90%;
  margin: 0 auto;
  & form {
    background: ${props => props.theme.colors.mainGradient};
    padding: 2rem;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    & h2 {
      font-size: 24px;
      margin-bottom: 1rem;
      text-align: center;
    }
  }

  & svg {
    color: ${props => props.theme.colors.lightContrast};
  }

  & .image-label {
    margin-top: 1rem;
    width: 100%;
    height: 100%;
    max-height: 300px;
    border-radius: 2px;
    cursor: pointer;
    border: 1px dashed ${props => props.theme.colors.lightContrast};
    & input {
      display: none;
    }

    & img {
      width: 100%;
      height: 100%;
      max-height: 298px;
      border-radius: 2px;
    }

    & .drop-image {
      width: 100%;
      height: 100%;
      padding: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      & p {
        font-size: 14px;
      }
    }
  }

  & .publish {
    margin-top: 2rem;
    & button {
      width: 16rem;
      & svg {
        color: ${props => props.theme.colors.namesakeText};
      }
    }
  }

  @media (min-width: 1100px) {
    width: 50%;

    & .image-label {
      max-height: 432px;
      & img {
        max-height: 430px;
      }
    }
  }
`;

export const EmptyPostContainer = styled.div`
  color: ${props => props.theme.colors.lightContrast};
  background: ${props => props.theme.colors.secondaryBackgroundColor};
  padding: 2rem 1rem;
  font-size: 20px;
  text-align: center;
  border-radius: 4px;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  & p {
    margin-top: 2rem;
  }

  & button {
    margin-top: 2rem;
    background-color: ${props => props.theme.colors.mainColor};
    padding: 1rem 2rem;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    color: ${props => props.theme.colors.secondaryBackgroundColor};
    font-family: ${props => props.theme.fonts.display};
    cursor: pointer;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    & span {
      display: flex;
      transform: rotate(90deg);
    }
    transition: all 0.4s ease;

    &:hover {
      & span {
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
`;
