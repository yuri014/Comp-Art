import styled from 'styled-components';

const ShareContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.shareBackground};
  border-radius: 5px;
  cursor: pointer;

  .share {
    padding: 1rem;
    margin-bottom: 1rem;

    .share-info {
      display: flex;
      align-items: center;
      justify-content: space-between;

      img {
        height: 4.5rem;
        width: 4.5rem;
        border-radius: 50%;
      }
    }

    .share-content {
      margin-top: 1rem;

      .description {
        margin: 1rem 0;
      }

      .date {
        font-size: 1.3rem;
        text-align: right;
      }
    }
  }
  @media (min-width: 1100px) {
    margin-bottom: 0.6rem;

    .share {
      .share-content {
        .date {
          text-align: left;
        }
      }
    }
  }
`;

export default ShareContainer;
