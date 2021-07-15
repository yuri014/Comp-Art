import formatTime from '@utils/formatTime';

test('Should format time for the audio player', () => {
  expect(formatTime(90)).toEqual({ minutes: '01', seconds: 30 });
});
