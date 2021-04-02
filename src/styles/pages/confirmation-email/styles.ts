import styled from 'styled-components';

const ConfirmationEmailContainer = styled.div`
  height: 100vh;
  color: ${({ theme }) => theme.colors.lightContrast};
  display: flex;
  align-items: center;
  justify-content: center;

  .confirm-email-message,
  .error-confirm-email {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }

  .confirm-email-message {
    border: 1px solid ${({ theme }) => theme.colors.mainColor};
    box-shadow: 2px 2px 4px ${({ theme }) => theme.colors.mainColor};
    height: 18rem;
    padding: 2rem;
    border-radius: 4px;
  }

  .error-confirm-email {
    border: 1px solid ${({ theme }) => theme.colors.danger};
    height: 18rem;
    padding: 1rem;
    border-radius: 4px;
  }
`;

export default ConfirmationEmailContainer;
