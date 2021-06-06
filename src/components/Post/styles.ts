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

    .publish-date {
      font-size: 1.3rem;
      padding-top: 1rem;
      margin-top: 1rem;
      border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
      display: flex;
      align-items: center;
      justify-content: space-between;

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
      }
    }

    .post-description {
      margin: 1rem 0 1rem 0;
      max-width: 100%;
      cursor: text;
      width: fit-content;

      &-loading {
        width: unset;
      }
    }

    .post-info {
      .post-counts {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 0.8rem;

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

          &.share-count {
            display: none;
          }

          .likes-images {
            display: flex;
            align-items: center;
            flex-direction: row-reverse;
            img {
              width: 2.4rem;
              height: 2.4rem;
              border-radius: 50%;
              object-fit: cover;

              & + img {
                margin-right: -1.6rem;
              }

              &:first-child {
                margin-right: 0.4rem;
              }
            }
          }
        }
      }

      p {
        font-size: 1.3rem;
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

        p {
          font-size: 1.3rem;
        }

        .share-count-mobile {
          display: none;
        }

        .post-counts {
          width: 43rem;

          button {
            &.share-count {
              display: block;
            }
          }

          @media (min-width: 1100px) {
            width: 39rem;
          }
        }

        .publish-date {
          border-top: none;
          padding: 0;
          margin-top: 0;
        }
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
