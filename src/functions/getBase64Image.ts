import { getPlaiceholder } from 'plaiceholder';

const getBase64Image = async (getSrc: () => string): Promise<string> => {
  const src = getSrc();

  if (src === '') {
    return src;
  }

  const { base64 } = await getPlaiceholder(src, {
    size: 10,
  });

  return base64;
};

export default getBase64Image;
