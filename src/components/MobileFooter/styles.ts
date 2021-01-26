import styled from 'styled-components';

const MobileFooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  font-size: 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.secondaryBackgroundColor};
  padding: 1rem 2rem;

  a {
    height: 24px;
    color: ${props => props.theme.colors.mainColor};
  }

  .active-footer-link {
    color: ${props => props.theme.colors.mainColor};
    border-bottom: 2px solid ${props => props.theme.colors.mainColor};
    height: 28px;
  }

  @media (min-width: 1100px) {
    display: none;
  }
`;

export default MobileFooterContainer;
