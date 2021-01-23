import { useState } from 'react';

interface ImagePreview {
  preview: string | ArrayBuffer;
  file: string | File;
}

const useImagePreview = (): [
  ImagePreview,
  // eslint-disable-next-line no-unused-vars
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
