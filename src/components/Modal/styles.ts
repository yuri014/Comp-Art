import styled from 'styled-components';

const ModalContainer = styled.section`
  &.modal-block-false {
    display: none;
  }

  &.modal-block-true {
    text-align: center;
    position: fixed;
    left: 0;
    bottom: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    animation: modal-background 0.2s ease-in-out;
    transform-origin: top;
  }

  @keyframes modal-background {
    from {
      height: 0;
    }
    to {
      height: 100%;
    }
  }

  .modal {
    max-width: calc(100% - 2rem);
    margin: auto;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.modalBackrgound};
    border-radius: 20px;
    color: ${({ theme }) => theme.colors.themeColor};
    text-align: left;
    padding: 2rem;
    animation: modal-start 0.5s ease-in-out 0.2s forwards;
    transform-origin: center;
    transform: scale(0);

    .modal-content {
      .modal-title {
        padding-top: 4rem;
        font: 2rem ${({ theme }) => theme.fonts.primary};
        text-align: center;
        font-weight: bold;
      }

      .modal-body {
        padding: 3rem;
        padding-top: 2rem;
        text-align: center;
        font: 1.6rem ${({ theme }) => theme.fonts.primary};
        color: ${({ theme }) => theme.colors.themeColor};
      }
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

  .close-modal {
    border: none;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.themeColor};
    font-size: 2rem;
    position: absolute;
    display: flex;
    align-self: flex-end;
    cursor: pointer;
  }

  @media (min-width: 1100px) {
    .modal {
      width: 50%;
      padding: 3rem;

      .modal-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        padding: 4rem;

        .modal-title {
          padding: 0;
        }
      }
    }
  }
`;

export default ModalContainer;
