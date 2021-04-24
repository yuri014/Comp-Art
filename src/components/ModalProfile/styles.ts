import styled from 'styled-components';

const ModalProfileContainer = styled.div`
  margin-top: 3rem;

  .modal-content {
    min-height: 15rem;
    max-height: 30rem;
    overflow-x: auto;

    @keyframes modal-background {
      from {
        height: 0;
      }
      to {
        height: 100%;
      }
    }

    @keyframes modal-start {
      from {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }
    }
  }
`;

export default ModalProfileContainer;
