import styled from 'styled-components';

const MobileFooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1;

  @media (min-width: 1100px) {
    display: none;
  }
`;

export default MobileFooterContainer;
