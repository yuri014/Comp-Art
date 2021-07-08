import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DocumentNode, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { MdEdit } from 'react-icons/md';
import { IconButton, ThemeProvider } from '@material-ui/core';
import { FaTimes } from 'react-icons/fa';

import CAButton from '@styles/components/button';
import { IProfile, IProfileInput } from '../../interfaces/Profile';
import formTheme from '../../styles/themes/FormTheme';
import TagsContainer from '../../styles/components/tags';
import ErrorMessage from '../ErrorMessage';
import FormProfileContainer from './styles';
import useImagePreview from '../../hooks/imagePreview';
import ProfileImagePreview from './ProfileImagePreview';
import { AuthContext } from '../../context/auth';
import ProfileLinksForm from './utils/ProfileLinksForm';
import Input from '../Input';

interface FormProfileProps {
  mutation: DocumentNode;
  defaultValues?: IProfile;
  buttonMessage: string;
}

const FormProfile: React.FC<FormProfileProps> = ({
  defaultValues,
  mutation,
  buttonMessage,
}) => {
  const { register, handleSubmit, errors, setValue } = useForm<IProfileInput>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const [showError, setShowError] = useState('');
  const [tags, setTags] = useState([]);
  const [coverImage, setCoverImage] = useImagePreview();
  const [tagInput, setTagInput] = useState('');
  const [oldProfileImage, setOldProfileImage] = useState('');
  const [oldCoverImage, setOldCoverImage] = useState('');
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useImagePreview();

  const [handleProfileMutation] = useMutation(mutation, {
    onCompleted: () => router.push('/home'),
    onError: ({ graphQLErrors }) => setShowError(graphQLErrors[0].message),
  });

  const onSubmit = (data: IProfileInput) => {
    handleProfileMutation({
      variables: {
        profile: {
          ...data,
          avatar: profileImage.file,
          coverImage: coverImage.file,
          hashtags: tags,
        },
      },
    });
  };

  useEffect(() => {
    if (defaultValues) {
      setTags(defaultValues.hashtags ? defaultValues.hashtags : []);
      setValue('name', defaultValues.name);
      setValue('bio', defaultValues.bio || '');

      const { links } = defaultValues;

      setValue('links.bandcamp', links.bandcamp);
      setValue('links.soundcloud', links.soundcloud);
      setValue('links.customLink', links.customLink);
      setValue('links.deviantart', links.deviantart);
      setValue('links.facebook', links.facebook);
      setValue('links.pinterest', links.pinterest);
      setValue('links.twitter', links.twitter);
      setValue('links.wattpad', links.wattpad);

      if (defaultValues.coverImage) {
        setOldCoverImage(defaultValues.coverImage);
      }

      if (defaultValues.avatar) {
        setOldProfileImage(defaultValues.avatar);
      }
    }
  }, [defaultValues, setTags, setValue]);

  return (
    <ThemeProvider theme={formTheme}>
      <FormProfileContainer onSubmit={handleSubmit(onSubmit)} className="forms">
        <div className="profile-image-cover">
          <ProfileImagePreview
            alt="Capa do perfil"
            olderImage={oldCoverImage}
            preview={coverImage.preview as string}
          >
            <div className="holder" />
          </ProfileImagePreview>
          <label htmlFor="uploadCoverButton">
            <div
              className="upload-cover"
              title="Clique aqui para adicionar a capa"
            >
              <MdEdit />
              Adicionar capa
            </div>
            <input
              accept="image/*"
              name="coverImage"
              id="uploadCoverButton"
              type="file"
              onChange={e => setCoverImage(e)}
            />
          </label>
        </div>
        <div className="profile-image-upload">
          <ProfileImagePreview
            alt="Imagem do perfil"
            olderImage={oldProfileImage}
            preview={profileImage.preview as string}
          >
            <div className="holder">
              <p>
                {user.username[0]}
                {user.username[1]}
              </p>
            </div>
          </ProfileImagePreview>

          <label htmlFor="uploadButton">
            <IconButton aria-label="Adicionar foto do perfil" component="span">
              <MdEdit className="upload-icon" />
              <input
                accept="image/*"
                name="avatar"
                id="uploadButton"
                type="file"
                onChange={e => {
                  setProfileImage(e);
                }}
              />
            </IconButton>
          </label>
        </div>
        <div className="inputs">
          <Input
            name="name"
            placeholder="Seu nome"
            refInput={register({
              required: true,
            })}
            required
            error={errors.name && 'Nome é obrigatório'}
          >
            Nome*
          </Input>
          <Input
            name="bio"
            refInput={register({
              required: false,
            })}
            placeholder="Sua bio"
          >
            Bio
          </Input>
          <Input
            name="tags"
            placeholder="Coloque aqui seus 5 gostos preferidos"
            helperText="Pressione vírgula cadastrar uma tag e para remover clique sobre ela"
            onChange={e =>
              e.target.value !== ',' && setTagInput(e.target.value)
            }
            value={tagInput}
            onKeyDown={e => {
              if (e.key === ',') {
                if (tags.length <= 4 && !tags.includes(`#${tagInput}`)) {
                  setTags([...tags, `#${tagInput}`]);
                  setTagInput('');
                } else {
                  setShowError('Limite de 5 hashtags sem repetição!');
                }
              }
            }}
          >
            Adicionar tags*
          </Input>
          <TagsContainer>
            {tags.map(tag => (
              <button
                type="button"
                onClick={() =>
                  setTags(tags.filter(tagToRemove => tagToRemove !== tag))
                }
                key={tag}
              >
                <p>{tag}</p> <FaTimes />
              </button>
            ))}
          </TagsContainer>

          <ProfileLinksForm register={register} />
          {showError && <ErrorMessage>{showError}</ErrorMessage>}
          <CAButton type="submit">{buttonMessage}</CAButton>
        </div>
      </FormProfileContainer>
    </ThemeProvider>
  );
};

export default FormProfile;
