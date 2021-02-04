import styled from 'styled-components';

const HomeContainer = styled.main`
  .home-desktop-content {
    padding: 8rem 4rem;
  }

  .timeline {
    width: 50%;
    margin-left: 25%;
  }

  @media (max-width: 992px) {
    .home-desktop-content {
      padding: 8rem 2rem;
      .quests,
      .profile {
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
