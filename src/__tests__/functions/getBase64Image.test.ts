import getBase64Image from '@ssr-functions/getBase64Image';

describe('Get Base64 for placholder blur in images', () => {
  it('Should return an empty string', async () => {
    const base64 = await getBase64Image(() => '');

    expect(base64).toBe('');
  });

  it('Should not return an empty string', async () => {
    const base64 = await getBase64Image(() => 'http://placekitten.com/200/300');

    expect(base64).not.toBe('');
  });
});
