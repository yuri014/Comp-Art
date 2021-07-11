import styled from 'styled-components';

const AvatarPlaceholder = styled.div`
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .holder {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    font-size: 2.2rem;
    color: #1cc5b7;
    text-transform: uppercase;
    font-weight: bold;
    background: #050211;
    width: 100%;
    height: 100%;
    border-radius: 50%;

    p {
      position: absolute;
    }
  }
`;

export default AvatarPlaceholder;
