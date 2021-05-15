const getValueForProgress = (value: number): number => {
  const limit = 12;

  const formattedValue = Math.floor((value / limit) * 100);

  return formattedValue;
};

export default getValueForProgress;
