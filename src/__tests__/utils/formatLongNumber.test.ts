import formatLongNumbers from '@utils/formatLongNumber';

describe('All numbers must be formatted', () => {
  test('Should render without abbreviation', () => {
    expect(formatLongNumbers(100)).toBe('100');
  });

  test('Should render with "k" abbreviation', () => {
    expect(formatLongNumbers(1000)).toBe('1k');
  });

  test('Should render with "m" abbreviation', () => {
    expect(formatLongNumbers(1000000)).toBe('1m');
  });
});
