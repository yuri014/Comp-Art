const formatDate = (date: string): string => {
  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  const newDate = new Date(date);
  const month = months[newDate.getMonth()];
  const formattedDate = `${newDate.getDate()} ${month} ${newDate.getFullYear()}`;

  return formattedDate;
};

export default formatDate;
