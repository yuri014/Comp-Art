import styled from 'styled-components';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.themeColor};
  background: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  padding: 1rem;
  padding-top: 2rem;
  font-size: 1.8rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  box-shadow: ${({ theme }) => theme.colors.mainShadow};
  margin-bottom: 4rem;
  cursor: pointer;

  .post-author {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .author-info {
      display: flex;
      align-items: center;

      div {
        margin-left: 2rem;
      }
    }

    img {
      width: 4.5rem;
      height: 4.5rem;
      border-radius: 50%;
      object-fit: fill;
    }
  }

  .post {
    margin: 1rem 0 1rem 0;

    .post-description {
      margin: 1rem 0 1rem 0;
      max-width: 100%;
      cursor: text;
      width: fit-content;

      &-loading {
        width: unset;
      }
    }
  }

  @media (min-width: 768px) {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 2rem;
    padding: 4rem;
    border-radius: 5px;

    .post {
      .post-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  @media (min-width: 1100px) {
    padding: 2rem;
    padding-bottom: 1rem;
    width: 100%;
  }
`;

export default PostContainer;
