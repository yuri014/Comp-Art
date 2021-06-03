import React from 'react';
import { IoMdClose } from 'react-icons/io';

import Input from '@components/Input';

interface MediaFormProps {
  preview: string;
  imageDimension: 'contain' | 'cover';
  audioResult: File;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setImagePreview: (_args0: string) => void;
}

const MediaForm: React.FC<MediaFormProps> = ({
  audioResult,
  imageDimension,
  preview,
  setImagePreview,
  setTitle,
}) => (
  <div className="form-media">
    <div className="media">
      <button type="button" onClick={() => setImagePreview('')}>
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
  </div>
);

export default MediaForm;
