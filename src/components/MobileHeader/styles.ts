import styled from 'styled-components';

const size = '3rem';

const MobileHeaderContainer = styled.header`
  nav {
    position: fixed;
    top: -1px;
    font-size: ${size};
    width: 100%;
    display: flex;
    z-index: 9;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.alternativeBackground};
    height: 5rem;
    transition: top 0.4s ease-in-out;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

    &.hide {
      top: -6rem;
    }
  }

  a {
    font-size: 0;
    transform: scale(0.8);

    p {
      font: 400 16px ${({ theme }) => theme.fonts.display}, sans-serif;
      filter: blur(0.4px);
      letter-spacing: 4px;
      color: ${({ theme }) => theme.colors.themeColor};
      text-shadow: 3px 3px 2px ${({ theme }) => theme.colors.titleColor};
    }
  }

  .profile {
    border: none;
    background: transparent;
    padding: 12px;
    display: flex;

    .profile-image {
      height: ${size};
      width: ${size};

      img {
        object-fit: cover;
      }

      p {
        font-size: 1.6rem;
      }
    }
  }

  @media (min-width: 1100px) {
    display: none;
  }
`;

export default MobileHeaderContainer;
