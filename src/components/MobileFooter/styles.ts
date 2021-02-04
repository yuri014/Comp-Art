import styled from 'styled-components';

const MobileFooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;

  @media (min-width: 992px) {
    display: none;
  }
`;

export default MobileFooterContainer;
