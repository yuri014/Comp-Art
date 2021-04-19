import styled from 'styled-components';

const SocialInputContainer = styled.div`
  position: relative;

  .input-container {
    display: flex;
    background-color: ${({ theme }) => theme.colors.backgroundColor};
    border: none;
    border-radius: 5px;
    padding: 1.4rem 2rem;
    color: ${({ theme }) => theme.colors.themeColor};
    box-shadow: ${({ theme }) => theme.colors.secondaryShadow};

    &:focus-within {
      padding: calc(1.4rem - 1px) 2rem;
      border: 1px solid #949494;
      outline: none;
    }

    input {
      font-family: ${({ theme }) => theme.fonts.primary};
      width: 100%;
      border: none;
      background-color: transparent;
      color: ${({ theme }) => theme.colors.themeColor};
      margin-bottom: 0.2rem;

      &:focus {
        outline: none;
      }
    }

    .link-label {
      display: inline-flex;
      align-items: center;
      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.themeColor};

      svg {
        margin-right: 0.6rem;
      }

      p {
        font-size: 1.4rem;
        margin-bottom: 0.2rem;
      }
    }
  }
`;

export default SocialInputContainer;
