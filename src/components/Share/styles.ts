import styled from 'styled-components';

const ShareContainer = styled.div`
  background-color: #26262f;
  border-radius: 5px;
  cursor: pointer;

  .share {
    padding: 1rem;
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
        font-size: 1.2rem;
        text-align: right;
      }
    }
  }
`;

export default ShareContainer;
