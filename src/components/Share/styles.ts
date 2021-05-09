import styled from 'styled-components';

const ShareContainer = styled.div`
  background-color: #26262f;
  border-radius: 5px;

  .share {
    .share-info {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      img {
        height: 4.5rem;
        width: 4.5rem;
        border-radius: 50%;
      }
    }
  }
`;

export default ShareContainer;
