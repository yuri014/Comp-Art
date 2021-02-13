import styled from 'styled-components';

const CommentContainer = styled.div`
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
      box-shadow: 1px 2px 4px ${props => props.theme.colors.backgroundColor};
    }
  }

  .comment-body {
    background: ${props => props.theme.colors.secondaryBackgroundColor};
    color: ${props => props.theme.colors.lightContrast};
    border-radius: 4px;
    padding: 1rem;
    box-shadow: 1px 2px 4px ${props => props.theme.colors.backgroundColor};

    a {
      color: ${props => props.theme.colors.lightContrast};
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      font-weight: 700;

      p:last-child {
        color: ${props => props.theme.colors.blueContrast};
        font-weight: 400;
        margin-left: 0.5rem;
      }
    }

    .comment-text {
      margin-top: 1rem;
      font-size: 1.2rem;
    }
  }

  .comment-interations {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    font-size: 1rem;
    color: ${props => props.theme.colors.lightContrast};
    margin-left: 1rem;

    p {
      margin-left: 0.5rem;
      font-weight: 700;
    }
  }
`;

export default CommentContainer;
