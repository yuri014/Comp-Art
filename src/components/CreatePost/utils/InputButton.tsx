import React, { useRef } from 'react';
import { FaRegFileImage } from 'react-icons/fa';
import { IoMdMusicalNote } from 'react-icons/io';

import { TypeSetImagePreview } from '@hooks/imagePreview';

interface InputFileButtonsProps {
  setImagePreview: (_args0: TypeSetImagePreview) => void;
  setAudioResult: React.Dispatch<React.SetStateAction<File>>;
}

const InputFileButtons: React.FC<InputFileButtonsProps> = ({
  setAudioResult,
  setImagePreview,
}) => {
  const audioInput = useRef<HTMLInputElement | null>(null);
  const imageInput = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <button
        className="icon-button"
        type="button"
        onClick={() => imageInput.current.click()}
        aria-label="Adicionar imagens"
      >
        <FaRegFileImage />
      </button>
      <input
        accept="image/*"
        id="uploadImage"
        type="file"
        onChange={e => {
          setImagePreview(e);
          e.target.value = '';
        }}
        ref={imageInput}
      />

      <button
        className="icon-button"
        type="button"
        onClick={() => audioInput.current.click()}
        aria-label="Adicionar vídeos"
      >
        <IoMdMusicalNote />
      </button>
      <input
        accept="audio/*"
        id="uploadAudio"
        type="file"
        onChange={e => {
          setAudioResult(e.target.files[0]);
          e.target.value = '';
        }}
        ref={audioInput}
      />
    </div>
  );
};

export default React.memo(InputFileButtons);
