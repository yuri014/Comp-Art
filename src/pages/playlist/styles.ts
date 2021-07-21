import styled from 'styled-components';

const PlaylistPageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  padding: 2rem 1rem;
  box-shadow: ${({ theme }) => theme.colors.mainShadow};

  .playlist-info {
    display: flex;
    gap: 1rem;

    .playlist-cover {
      width: 14rem;
      height: 14rem;

      button {
        width: 100%;
        height: 100%;

        img {
          border-radius: 5px;
        }
      }
    }

    &-content {
      height: 14rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      strong {
        font-size: 2.2rem;
      }

      .playlist-author-info {
        font-size: 1.4rem;
        margin-top: -0.4rem;

        a {
          color: ${({ theme }) => theme.colors.themeColor};
          text-decoration: underline;
        }

        .playlist-counts {
          margin-top: 0.6rem;
          .pipe {
            display: none;
          }

          div {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
        }
      }

      .buttons {
        display: flex;
        gap: 1rem;

        button {
          width: 8rem;
          padding: 1rem;
          margin-bottom: 0;
          border-radius: 5px;

          &:first-of-type {
            background-color: ${({ theme }) => theme.colors.pink};
          }
        }
      }
    }
  }

  .playlist-description {
    font-size: 1.4rem;
    margin-top: 1rem;
    color: ${({ theme }) => theme.colors.darkGray};
    font-weight: 300;
  }
`;

export default PlaylistPageContainer;
