import styled from 'styled-components';

const HomeContainer = styled.main`
  .home-desktop-content {
    padding: 8rem 4rem;
    display: grid;
    grid-template-columns: 20% 50% 20%;
    justify-content: space-between;
    margin: auto;
  }

  @media (min-width: 1440px) {
    grid-template-columns: 25% 45% 25%;
  }

  @media (max-width: 992px) {
    .home-desktop-content {
      display: block;
      padding: 8rem 2rem;
      aside {
        display: none;
      }
      & .timeline {
        display: block;
        width: 100%;
        margin-left: 0;
      }
    }
  }
`;

export default HomeContainer;
