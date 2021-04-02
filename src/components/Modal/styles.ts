import styled from 'styled-components';

const ModalContainer = styled.section`
  .modal-block-false {
    display: none;
  }

  .modal-block-true {
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    animation: modal-background 0.3s ease-in-out;
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

  .modal-content {
    width: 400rem;
    max-width: calc(100% - 6rem);
    margin: auto;
    display: flex;
    flex-direction: column;
    background-color: #1e2939;
    border-radius: 8px;
    border: 2px solid ${({ theme }) => theme.colors.mainColor};
    color: white;
    text-align: left;
    padding: 2rem;
    animation: modal-start 0.7s ease-in-out 0.3s forwards;
    transform-origin: center;
    transform: scale(0);
  }

  @keyframes modal-start {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  .modal-title {
    max-width: 90%;
    font: 2rem ${({ theme }) => theme.fonts.primary}, sans-serif;
    padding: 2px 7px;
    text-shadow: 2px 2px 2px #030447d3;
    letter-spacing: 1px;
    font-weight: bold;
  }

  .modal-body {
    padding: 14px 0;
    font: 16px ${({ theme }) => theme.fonts.primary}, sans-serif;
    color: gainsboro;
  }

  .close-modal {
    border: none;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.mainColor};
    font-size: 2rem;
    display: flex;
    position: absolute;
    align-self: flex-end;
    cursor: pointer;
  }

  .link-buttons-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .link-buttons-block a {
    color: ${({ theme }) => theme.colors.namesakeText};
    padding: 15px 15px;
    background: ${({ theme }) => theme.colors.mainColor};
    border-radius: 4px;
    width: 48%;
    letter-spacing: 1px;
    transition: filter 1s ease, color 1s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font: 400 12px ${({ theme }) => theme.fonts.display}, sans-serif;
  }

  .link-buttons-block a:hover {
    filter: drop-shadow(1px 1px 4px ${({ theme }) => theme.colors.mainColor});
    color: ${({ theme }) => theme.colors.lightText};
  }

  @media (min-width: 992px) {
    .modal-content {
      width: 40%;
    }
  }
`;

export default ModalContainer;
