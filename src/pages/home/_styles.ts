import styled from 'styled-components';

const HomeContainer = styled.main`
  .home-desktop-content {
    padding: 8rem 4rem;
    display: grid;
    grid-template-columns: 22% 54% 22%;
    justify-content: space-between;
    margin: auto;
  }

  @media (min-width: 1440px) {
    .home-desktop-content {
      grid-template-columns: 20% 50% 20%;
    }
  }

  @media (max-width: 1100px) {
    .home-desktop-content {
      display: block;
      padding: 8rem 0;
      margin: unset;
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
