import styled from 'styled-components';

const PostContainer = styled.section`
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.colors.lightContrast};
  background: ${props => props.theme.colors.secondaryBackgroundColor};
  border-radius: 4px;
  padding: 2rem;
  font-size: 18px;
  font-family: ${props => props.theme.fonts.primary};
  box-shadow: 0 0 6px #000;

  .post-author {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & .author-info {
      display: flex;
      align-items: center;
      & div {
        margin-left: 2rem;
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
        & p {
          font-size: 16px;
          margin-left: 1rem;
        }
      }
    }
  }
`;

export default PostContainer;
