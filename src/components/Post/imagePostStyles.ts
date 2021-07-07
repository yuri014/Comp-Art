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

    .post-image {
      cursor: pointer;
      width: 100%;
      border-radius: 4px;
      max-height: 350px;
      height: auto;

      @media (min-width: 768px) {
        height: unset;
        max-height: unset;
      }
    }
  }
`;

export default ImagePostContainer;
