import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const formatDistanceTimePass = (passDate: string, today = new Date()): string =>
  formatDistance(new Date(passDate), today, {
    locale: ptBR,
    addSuffix: true,
  });

export default formatDistanceTimePass;
