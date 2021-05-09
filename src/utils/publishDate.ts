import formatDate from './formatDate';

const publishDate = (date: string): string => {
  const formattedDate = formatDate(date);
  const hour = new Date(date).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${formattedDate} · ${hour}h`;
};

export default publishDate;
