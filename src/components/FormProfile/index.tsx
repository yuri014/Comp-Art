import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DocumentNode, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { SiWattpad } from 'react-icons/si';
import { MdEdit } from 'react-icons/md';
import { IconButton, ThemeProvider } from '@material-ui/core';
import {
  FaBandcamp,
  FaDeviantart,
  FaFacebook,
  FaLink,
  FaPinterest,
  FaSoundcloud,
  FaTwitter,
} from 'react-icons/fa';

import { IProfile, IProfileInput } from '../../interfaces/Profile';
import formTheme from '../../styles/themes/FormTheme';
import TagsContainer from '../../styles/components/tags';
import PressStartButton from '../PressStartButton';
import ErrorMessage from '../ErrorMessage';
import FormProfileContainer from './styles';
import useImagePreview from '../../hooks/imagePreview';
import ProfileImagePreview from './ProfileImagePreview';
import { AuthContext } from '../../context/auth';
import Input from '../Input';
import SocialInput from '../Splitter/SocialInput';

interface FormProfileProps {
  mutation: DocumentNode;
  defaultValues?: IProfile;
}

const FormProfile: React.FC<FormProfileProps> = ({
  defaultValues,
  mutation,
}) => {
  const { register, handleSubmit, errors, setValue } = useForm<IProfileInput>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { user } = useContext(AuthContext);

  const router = useRouter();
  const [showError, setShowError] = useState('');
  const [tags, setTags] = useState([]);

  const [profileImage, setProfileImage] = useImagePreview();
  const [coverImage, setCoverImage] = useImagePreview();

  const [handleProfileMutation] = useMutation(mutation, {
    onCompleted: () => router.push('/home'),
    onError: ({ graphQLErrors }) =>
      setShowError(graphQLErrors[0].extensions.errors),
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

  const [tagInput, setTagInput] = useState('');
  const [oldProfileImage, setOldProfileImage] = useState('');
  const [oldCoverImage, setOldCoverImage] = useState('');

  useEffect(() => {
    if (defaultValues) {
      setTags(defaultValues.hashtags ? defaultValues.hashtags : []);
      setValue('name', defaultValues.name);
      setValue('bio', defaultValues.bio);

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
        setOldCoverImage(
          process.env.NEXT_PUBLIC_API_HOST + defaultValues.coverImage,
        );

        setOldProfileImage(
          process.env.NEXT_PUBLIC_API_HOST + defaultValues.avatar,
        );
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
            <div className="upload-cover">
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
            <IconButton aria-label="upload picture" component="span">
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
            name="tags"
            placeholder="Coloque aqui seus 5 gostos preferidos"
            helperText="Pressione vírgula cadastrar uma tag e para remover clique sobre ela"
            onChange={e =>
              e.target.value !== ',' && setTagInput(e.target.value)
            }
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
            Adicionar tags
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
                {tag} X
              </button>
            ))}
          </TagsContainer>

          <div className="profile-links">
            <SocialInput
              label="Soundcloud"
              name="links.soundcloud"
              register={register}
            >
              <FaSoundcloud className="soundcloud-icon" />
              <p>soundcloud.com/</p>
            </SocialInput>
            <SocialInput
              label="Bandcamp"
              name="links.bandcamp"
              register={register}
              endAdornment=".bandcamp.com"
            >
              <FaBandcamp className="bandcamp-icon" />
            </SocialInput>
            <SocialInput
              label="Wattpad"
              name="links.wattpad"
              register={register}
            >
              <SiWattpad className="wattpad-icon" />
              <p>wattpad.com/user/</p>
            </SocialInput>
            <SocialInput
              name="links.pinterest"
              label="Pinterest"
              register={register}
            >
              <FaPinterest className="pinterest-icon" />
              <p>pinterest.com/</p>
            </SocialInput>
            <SocialInput
              name="links.twitter"
              label="Twitter"
              register={register}
            >
              <FaTwitter className="twitter-icon" />
              <p>twitter.com/</p>
            </SocialInput>
            <SocialInput
              name="links.facebook"
              label="Facebook"
              register={register}
            >
              <FaFacebook className="facebook-icon" />
              <p>facebook.com/</p>
            </SocialInput>
            <SocialInput
              name="links.deviantart"
              label="Deviantart"
              register={register}
            >
              <FaDeviantart className="deviantart-icon" />
              <p>deviantart.com/</p>
            </SocialInput>
            <SocialInput
              name="links.customLink"
              label="Link Adicional"
              register={register}
            >
              <FaLink className="primary-icon" />
            </SocialInput>
          </div>
          {showError && <ErrorMessage>{showError}</ErrorMessage>}
          <PressStartButton type="submit">Start</PressStartButton>
        </div>
      </FormProfileContainer>
    </ThemeProvider>
  );
};

export default FormProfile;
