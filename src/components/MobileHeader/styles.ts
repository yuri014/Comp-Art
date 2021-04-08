import styled from 'styled-components';

const size = '2.4rem';

const MobileHeaderContainer = styled.header`
  nav {
    position: fixed;
    top: 0;
    font-size: ${size};
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
    padding: 1rem 2rem;
    transition: all 0.4s ease-in-out;

    &.hide {
      top: -6rem;
    }
  }

  p {
    font: 400 16px ${({ theme }) => theme.fonts.display}, sans-serif;
    filter: blur(0.4px);
    letter-spacing: 4px;
    color: ${({ theme }) => theme.colors.themeColor};
    text-shadow: 3px 3px 2px ${({ theme }) => theme.colors.titleColor};
  }
  .profile {
    img {
      height: ${size};
      width: ${size};
      border-radius: 50%;
      object-fit: cover;
    }
  }

  a {
    size: ${size};
    color: ${({ theme }) => theme.colors.mainColor};
  }

  @media (min-width: 1100px) {
    display: none;
  }
`;

export default MobileHeaderContainer;
