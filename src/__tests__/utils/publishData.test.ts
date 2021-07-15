import publishDate from '@utils/publishDate';

it('Should render hour and date', () => {
  const date = 'Thu Jul 14 2021 21:13:27 GMT-0300';

  expect(publishDate(date)).toBe('14 Jul 2021 · 21:13h');
});
