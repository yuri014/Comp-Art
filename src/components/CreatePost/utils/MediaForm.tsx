import React from 'react';
import { IoMdClose } from 'react-icons/io';

import Input from '@components/Input';
import MediaFormContainer from './styles';

interface MediaFormProps {
  preview: string;
  imageDimension: 'contain' | 'cover';
  audioResult: File;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  cleaner: () => void;
}

const MediaForm: React.FC<MediaFormProps> = ({
  audioResult,
  imageDimension,
  preview,
  cleaner,
  setTitle,
}) => (
  <MediaFormContainer>
    <div className="media">
      <button type="button" onClick={() => cleaner()}>
        <IoMdClose />
      </button>
      <img
        src={preview as string}
        alt="Imagem do perfil"
        style={{ objectFit: imageDimension }}
      />
    </div>
    <Input
      name="title"
      placeholder={
        audioResult ? 'Digite o título da música' : 'Digite uma descrição'
      }
      required
      onChange={e => setTitle(e.target.value)}
    >
      {audioResult ? 'Título' : 'Alt'}
    </Input>
  </MediaFormContainer>
);

export default MediaForm;
