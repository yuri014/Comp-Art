import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaPalette } from 'react-icons/fa';

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
    <button type="button" className="cleaner" onClick={() => cleaner()}>
      <IoMdClose />
    </button>
    {audioResult ? (
      <>
        <div className="media audio-cover">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            htmlFor="uploadImage"
            aria-label="Upload da capa da música"
            title="Upload da capa da música"
          >
            <FaPalette />
          </label>
          <img
            src={(preview as string) || '/assets/audio-placeholder.svg'}
            alt="Capa do áudio"
            style={{ objectFit: imageDimension }}
          />
        </div>
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
            placeholder="Digite uma descrição da capa"
            onChange={e => setAlt(e.target.value)}
          >
            Alt
          </Input>
        </div>
      </>
    ) : (
      <>
        <div className="media">
          <img
            src={(preview as string) || '/assets/audio-placeholder.svg'}
            alt="Capa do áudio"
            style={{ objectFit: imageDimension }}
          />
        </div>
        <Input
          name="alt"
          placeholder="Digite uma descrição da imagem"
          onChange={e => setAlt(e.target.value)}
        >
          Alt
        </Input>
      </>
    )}
  </MediaFormContainer>
);

export default MediaForm;
