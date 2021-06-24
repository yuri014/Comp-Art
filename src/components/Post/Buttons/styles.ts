import styled from 'styled-components';

export const ModalShareContainer = styled.div`
  &.modal-content {
    padding-bottom: 0rem !important;
  }

  .draft-container {
    background: ${({ theme }) => theme.colors.shareBackground};
    height: 8rem;
    border-radius: 5px;
    padding: 1.2rem;
    font-size: 1.4rem;
  }

  button {
    width: 40%;
    margin: 0 auto;
    margin-top: 4rem;
    margin-bottom: 0;
  }
`;

const InteractionButtonsContainer = styled.div`
  padding-top: 1rem;
  margin-top: 1rem;
  font-size: 2.4rem;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  display: flex;
  align-items: center;
  justify-content: space-between;

  a,
  button {
    color: ${({ theme }) => theme.colors.darkGray};
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 1rem;
    font-size: 2.4rem;
    transition: all 0.4s ease-in-out;
    display: flex;
    align-items: center;
    border-radius: 5px;

    &:hover,
    &:focus {
      background: ${({ theme }) => theme.colors.lighterSecondaryBackground};
    }

    p {
      font-size: 1.6rem;
      margin-left: 1rem;
    }

    .interactions-button {
      display: flex;
      align-items: center;

      p {
        font-size: 1.4rem;
        margin-left: 1rem;
      }
    }

    &:focus {
      outline: none;
    }

    &.active {
      opacity: 1;
      color: ${({ theme }) => theme.colors.mainColor};

      svg {
        transform: scale(0);
        animation: liked 0.4s ease-in-out forwards;

        @keyframes liked {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
      }
    }

    &.bookmark {
      display: none;
    }
  }

  .interaction-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  @media (min-width: 768px) {
    .interaction-group {
      display: grid;
      grid-template-columns: auto auto auto;
      gap: 1rem;
      justify-content: flex-start;
      width: 43rem;

      @media (min-width: 1100px) {
        width: 39rem;
      }
    }

    button {
      .interactions-button {
        p {
          font-size: 1.4rem;
        }
      }

      &.bookmark {
        display: unset;
      }
    }
  }
`;

export default InteractionButtonsContainer;
