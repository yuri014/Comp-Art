import handleInjectionSink from '@utils/handleInjectionSink';

it('Should access array index by string', () => {
  const array = ['test', 'mock'];
  const index = '0';

  // @ts-ignore
  expect(handleInjectionSink(array, index)).toBe('test');
});
