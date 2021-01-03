import styled from 'styled-components';

const HomeContainer = styled.main`
  .home-desktop-content {
    padding: 8rem 4rem;
  }

  .timeline {
    width: 640px;
    margin-left: 340px;
  }

  .quests {
    margin-left: 980px;
  }

  @media (max-width: 1100px) {
    .home-desktop-content {
      display: none;
    }
  }
`;

export default HomeContainer;
