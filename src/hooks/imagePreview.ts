import { useState } from 'react';

interface ImagePreview {
  preview: string | ArrayBuffer;
  file: string | File;
}

/**
 * Hook para obter o preview e o arquivo de uma imagem.
 * @returns {Array} [image, setImage].
 * @returns image retorna um objeto com file e preview.
 * @returns setImage recebe um evento de um input como param.
 */
const useImagePreview = (): [
  ImagePreview,
  (_args0: React.ChangeEvent<HTMLInputElement>) => void,
] => {
  const [image, setImage] = useState<ImagePreview>({
    preview: '',
    file: '',
  });
  const setImagePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
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
