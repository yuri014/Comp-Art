import { useState } from 'react';

interface ImagePreview {
  preview: string | ArrayBuffer;
  file: string | File;
}

type TypeSetImagePreview = React.ChangeEvent<HTMLInputElement> | string;

/**
 * Hook para obter o preview e o arquivo de uma imagem.
 * @returns {Array} [image, setImage].
 * @returns image retorna um objeto com file e preview.
 * @returns setImage recebe um evento de um input como param.
 */
const useImagePreview = (): [
  ImagePreview,
  (_args0: TypeSetImagePreview) => void,
] => {
  const initialState = {
    preview: '',
    file: '',
  };

  const [image, setImage] = useState<ImagePreview>(initialState);

  /**
   * Aplica lógia do FileReader antes de setar o estado.
   * @param {string} string para limpar o campo.
   * @param {event} event evento de um HTMLInputElement.
   */
  const setImagePreview = (event: TypeSetImagePreview) => {
    if (typeof event === 'string') {
      setImage(initialState);

      return;
    }

    const reader = new FileReader();

    const file = event.target.files[0];
    reader.onloadend = () =>
      setImage({
        preview: reader.result,
        file,
      });
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return [image, setImagePreview];
};

export default useImagePreview;
