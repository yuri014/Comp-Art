import styled from 'styled-components';

const FormProfileContainer = styled.form`
  max-width: 60rem;
  background: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  border-radius: 4px;
  .profile-image-upload,
  .profile-image-cover {
    input {
      display: none;
    }
  }

  .profile-image-cover {
    border-radius: 4px 4px 0 0;
    height: 12rem;
    width: 100%;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    justify-content: flex-start;

    .upload-cover {
      background: #111112dd;
      font-size: 1.4rem;
      padding: 0.4rem 1rem;
      border-radius: 2px;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      margin-right: 1rem;
      margin-top: 1rem;
      cursor: pointer;
      color: #f5f5ff;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 4px 4px 0 0;
      object-fit: cover;
    }

    .holder {
      background: ${({ theme }) => theme.colors.lighterSecondaryBackground};
      border-radius: 4px 4px 0 0;
    }

    label {
      margin-top: -12rem;
    }
  }

  .profile-image-upload {
    margin: 0 auto;
    margin-top: -6rem;
    display: flex;
    align-items: baseline;
    justify-content: center;
    border-radius: 50%;

    a {
      width: 100%;
      height: 100%;
    }

    img {
      border-radius: 50%;
      width: 10rem;
      height: 10rem;
      object-fit: cover;
    }

    .holder {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 5rem;
      color: #000;
      text-transform: uppercase;
      font-weight: bold;
      width: 10rem;
      height: 10rem;
      border-radius: 50%;

      p {
        position: absolute;
      }
    }

    label {
      margin-left: -4rem;
      margin-bottom: 1rem;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.danger};
    }
  }

  .link-label-end {
    color: ${({ theme }) => theme.colors.lightContrast};
    margin-bottom: 0.2rem;
  }

  .inputs {
    padding: 0 1rem;
  }

  button[type='submit'] {
    display: block;
    padding: 1rem 4rem;
    font-weight: bold;
    width: auto;
    margin: 0 auto;
    margin-top: 1rem;
    margin-bottom: 3rem;
    font-size: 1.6rem;
  }

  @media (min-width: 1100px) {
    .inputs {
      padding: 0 6rem;
    }

    .profile-image-cover {
      .upload-cover {
        margin-top: 8rem;
        margin-right: 2rem;
      }
    }

    .profile-links {
      display: grid;
      grid-template-columns: 48% 48%;
      justify-content: space-between;
    }
  }
`;

export default FormProfileContainer;
