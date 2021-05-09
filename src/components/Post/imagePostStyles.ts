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
      height: 30vh;

      @media (min-width: 1100px) {
        height: 45vh;
      }

      img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
        object-fit: cover;
      }
    }
  }
`;

export default ImagePostContainer;
