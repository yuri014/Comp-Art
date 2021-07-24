import styled from 'styled-components';

const ImagePostContainer = styled.div`
  button {
    display: block;
    background-color: transparent;
    border: none;

    &.image-button {
      width: 100%;
      margin-bottom: 1rem;
    }

    .post-image,
    span {
      cursor: pointer;
      width: 100%;
      border-radius: 4px;
      height: auto !important;

      @media (min-width: 768px) {
        height: 100%;
      }
    }
  }
`;

export default ImagePostContainer;
