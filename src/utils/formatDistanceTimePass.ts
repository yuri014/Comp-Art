import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const formatDistanceTimePass = (date: string): string =>
  formatDistance(new Date(), new Date(date), {
    locale: ptBR,
    addSuffix: true,
  });

export default formatDistanceTimePass;
