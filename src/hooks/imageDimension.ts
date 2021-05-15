import { useState, useEffect } from 'react';

const useImageDimension = (
  preview: string | ArrayBuffer,
): 'cover' | 'contain' => {
  const [imageDimension, setImageDimension] = useState<'cover' | 'contain'>(
    'cover',
  );

  useEffect(() => {
    const img = new Image();
    img.src = preview as string;
    img.onload = () => {
      if (img.naturalWidth / 2 > img.naturalHeight) {
        setImageDimension('contain');
      } else {
        setImageDimension('cover');
      }
    };
  }, [preview]);

  return imageDimension;
};

export default useImageDimension;
