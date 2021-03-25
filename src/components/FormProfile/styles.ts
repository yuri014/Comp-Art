import styled from 'styled-components';

const FormProfileContainer = styled.form`
  width: 85%;
  background: ${props => props.theme.colors.mainGradient};
  border-radius: 4px;
  .profile-image-upload,
  .profile-image-cover {
    input {
      display: none;
    }
  }

  .inputs {
    padding: 2rem;
  }

  .profile-image-cover {
    border-radius: 4px 4px 0 0;
    height: 12rem;
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;

    img {
      width: 100%;
      height: 100%;
      border-radius: 4px 4px 0 0;
      object-fit: cover;
    }
    .holder {
      background: ${props => props.theme.colors.lightContrast};
      border-radius: 4px 4px 0 0;
    }
    label {
      margin-top: -12rem;
      .upload-icon {
        color: ${props => props.theme.colors.mainColor};
      }
    }
  }

  .profile-image-upload {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    margin-top: -6rem;
    display: flex;
    align-items: baseline;
    border-radius: 50%;

    a {
      width: 100%;
      height: 100%;
    }

    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    label {
      margin-left: -4rem;
      margin-bottom: 1rem;
      border-radius: 50%;
      background: ${props => props.theme.colors.mainColor};

      .upload-icon {
        color: ${props => props.theme.colors.white};
      }
    }
  }

  .link-label {
    color: ${props => props.theme.colors.lightContrast};
    margin-left: 1rem;
    margin-right: -0.9rem;
    margin-bottom: 0.2rem;
  }

  .link-label-end {
    color: ${props => props.theme.colors.lightContrast};
    margin-bottom: 0.2rem;
  }

  @media (min-width: 992px) {
    width: 100%;
    .profile-links {
      display: grid;
      grid-template-columns: 48% 48%;
      justify-content: space-between;
    }

    .link-label {
      margin-bottom: 0.1rem;
    }
  }
`;

export default FormProfileContainer;
