import styled from 'styled-components';

export const UnlockArtistContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  div {
    width: 20rem;
    height: 20rem;
  }
`;

export const ModalShareContainer = styled.div`
  &.modal-content {
    padding-bottom: 0rem !important;
  }

  .input-container {
    position: relative;

    .draft-container {
      background: ${({ theme }) => theme.colors.shareBackground};
      height: auto;
      border-radius: 5px;
      padding: 1.2rem;
      font-size: 1.4rem;
    }

    .counter-container {
      right: 0.5rem;
      top: 0.5rem;
    }
  }

  button {
    width: 40%;
    margin: 0 auto;
    margin-top: 4rem;
    margin-bottom: 0;
  }
`;
