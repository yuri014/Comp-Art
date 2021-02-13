import styled from 'styled-components';

const FullScreenImageContainer = styled.div`
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  padding: 2rem 4rem;
  padding-bottom: 8rem;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);

  .close {
    position: absolute;
    left: 0;
    top: 0;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    object-fit: contain;
  }
`;

export default FullScreenImageContainer;
