import handleInjectionSink from './handleInjectionSink';

const abbreviations = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

const formatLongNumbers = (count: number): string | number => {
  const getIndex = () => {
    if (count === 0) {
      return count;
    }

    return Math.floor(Math.log(count) / Math.log(1000));
  };

  const index = getIndex();
  const result = parseFloat((count / 1000 ** index).toFixed(2));
  return `${result}${handleInjectionSink(abbreviations, index)}`;
};

export default formatLongNumbers;
