import styled from 'styled-components';

const FooterContainer = styled.footer`
  margin-top: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    width: 90%;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    font-size: 1.3rem;

    a {
      color: ${({ theme }) => theme.colors.themeColor};
    }
  }

  svg {
    display: block;
    transform: scale(0.4) translateX(-50%);
    width: 4rem;
    margin-left: 0;
  }

  @media (min-width: 1100px) {
    div {
      width: 48rem;

      a {
        font-size: 2rem;
      }
    }

    svg {
      transform: scale(0.8) translateX(-50%);
    }
  }
`;

export default FooterContainer;
