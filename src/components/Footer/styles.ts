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
    font-size: 1.2rem;

    a {
      color: ${props => props.theme.colors.themeColor};
    }
  }

  svg {
    color: ${props => props.theme.colors.themeColor};
    font-size: 1.6rem;
  }

  @media (min-width: 992px) {
    div {
      width: 57rem;

      a {
        font-size: 2rem;
      }
    }

    svg {
      font-size: 2.6rem;
    }
  }
`;

export default FooterContainer;
