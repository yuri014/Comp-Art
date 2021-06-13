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
    background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
    height: 5rem;
    transition: top 0.4s ease-in-out;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

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
    border: none;
    background: transparent;
    padding: 12px;

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
