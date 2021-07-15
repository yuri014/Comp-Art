import formatDistanceTimePass from '@utils/formatDistanceTimePass';

it('Should show distance from past to now', () => {
  const passDate = 'Thu Jul 14 2021 21:13:27 GMT-0300';
  const today = 'Thu Jul 15 2021 21:13:27 GMT-0300';

  expect(formatDistanceTimePass(passDate, new Date(today))).toBe('há 1 dia');
});
