import styled from 'styled-components';

const ImagePostContainer = styled.div`
  button {
    display: block;
    background-color: transparent;
    border: none;

    &.image-button {
      margin: 2rem 0;
      width: 100%;
    }

    .post-image {
      cursor: pointer;
      width: 100%;
      height: 26rem;

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
