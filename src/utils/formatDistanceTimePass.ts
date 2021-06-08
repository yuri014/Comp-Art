import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const formatDistanceTimePass = (date: string): string =>
  formatDistance(new Date(date), new Date(), {
    locale: ptBR,
    addSuffix: true,
  });

export default formatDistanceTimePass;
