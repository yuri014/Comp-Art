import styled from 'styled-components';

const RegisterProfileContainer = styled.main`
  color: ${({ theme }) => theme.colors.lightContrast};
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  height: 180vh;
  #register-profile-title {
    text-align: center;
    font-size: 2rem;
    word-wrap: break-word;
    margin: 0;
  }

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: 20% 50%;
    justify-content: space-around;
    height: 120vh;
    & h1 {
      font-size: 54px;
    }
  }
`;

export default RegisterProfileContainer;
