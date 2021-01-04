import styled from 'styled-components';

const HomeContainer = styled.main`
  .home-desktop-content {
    padding: 8rem 4rem;
  }

  .timeline {
    width: 50%;
    margin-left: 25%;
  }

  @media (max-width: 1100px) {
    .home-desktop-content {
      display: none;
    }
  }
`;

export default HomeContainer;
