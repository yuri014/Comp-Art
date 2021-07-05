import styled from 'styled-components';

export const DeleteAccountMessage = styled.div`
  span {
    color: ${({ theme }) => theme.colors.error};
  }

  div {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;

const DeleteAccountModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  input,
  p {
    width: 80%;
    margin: 0 auto;
  }

  .input-error {
    &:focus {
      border: 1px solid ${({ theme }) => theme.colors.error};
    }
  }

  p {
    margin-top: 0.4rem;
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.error};
  }

  button {
    width: 80%;
    display: block;
    margin: 3rem auto;
    background: ${({ theme }) => theme.colors.error};
  }

  @media (min-width: 768px) {
    button,
    input,
    p {
      width: 60%;
    }
  }

  @media (min-width: 1100px) {
    button,
    input,
    p {
      width: 80%;
    }

    button {
      margin-bottom: 0;
    }
  }
`;

export default DeleteAccountModalContainer;
