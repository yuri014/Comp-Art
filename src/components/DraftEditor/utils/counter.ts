const getValueForProgress = (value: number, limit: number): number => {
  const formattedValue = Math.floor((value / limit) * 100);

  return formattedValue;
};

export default getValueForProgress;
