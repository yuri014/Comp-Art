import formatDate from '@utils/formatDate';

it('Should be format a date', () => {
  const date = 'Thu Jul 14 2021 21:13:27 GMT-0300';
  expect(formatDate(new Date(date).toISOString())).toBe('14 Jul 2021');
});
