import styled from 'styled-components';

const NewPostContainer = styled.div`
  main {
    .posts-tabs {
      padding-top: 10rem;
      width: 90%;
      margin-left: auto;
      margin-right: auto;
    }
  }

  @media (min-width: 992px) {
    main {
      .posts-tabs {
        width: 50%;
      }
    }
  }
`;

export default NewPostContainer;
