import React from 'react';
import { IoMdClose } from 'react-icons/io';

import Input from '@components/Input';
import MediaFormContainer from './styles';

interface MediaFormProps {
  audioResult: File;
  cleaner: () => void;
  imageDimension: 'contain' | 'cover';
  preview: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setAlt: React.Dispatch<React.SetStateAction<string>>;
}

const MediaForm: React.FC<MediaFormProps> = ({
  audioResult,
  cleaner,
  imageDimension,
  preview,
  setAlt,
  setTitle,
}) => (
  <MediaFormContainer>
    <div className="media">
      <button type="button" onClick={() => cleaner()}>
        <IoMdClose />
      </button>
      <img
        src={(preview as string) || '/assets/audio-placeholder.svg'}
        alt="Capa do áudio"
        style={{ objectFit: imageDimension }}
      />
    </div>
    {audioResult ? (
      <div>
        <Input
          name="title"
          placeholder="Digite o título da música"
          required
          onChange={e => setTitle(e.target.value)}
        >
          Título
        </Input>
        <Input
          name="alt"
          placeholder="Digite uma descrição"
          onChange={e => setAlt(e.target.value)}
        >
          Alt
        </Input>
      </div>
    ) : (
      <Input
        name="alt"
        placeholder="Digite uma descrição"
        onChange={e => setAlt(e.target.value)}
      >
        Alt
      </Input>
    )}
  </MediaFormContainer>
);

export default MediaForm;
