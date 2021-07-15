import formatMetaHashtags from '@utils/formatHashtags';

it('Should render one hashtag', () => {
  const hashtags = ['#test'];

  expect(formatMetaHashtags(hashtags)).toBe('test');
});

it('Should format multiple hashtags', () => {
  const hashtags = ['#test', '#art'];

  expect(formatMetaHashtags(hashtags)).toBe('test e art');
});
