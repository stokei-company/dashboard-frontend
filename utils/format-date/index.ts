import { DateTime } from 'luxon';

export const formatDate = (date: string) => {
  return DateTime.fromISO(date).setLocale('pt-BR').toFormat('dd/LL/yyyy HH:mm');
};

export const formatBirthdayDate = (date: string) => {
  return DateTime.fromISO(date).toFormat('dd/LL/yyyy');
};

export const formatBirthdayDateISO = (date: string) => {
  return date?.slice(0, 10);
};

export const differenceDate = (dateStart: string, dateEnd: string) => {
  const start = DateTime.fromISO(dateStart);
  const end = DateTime.fromISO(dateEnd);
  const interval = end.diff(start, ['years', 'months', 'days', 'hours']);
  let response: string[] = [];
  if (interval.years > 0) {
    response = [
      ...response,
      `${interval.months} ${interval.years === 1 ? 'ano' : 'anos'}`
    ];
  }
  if (interval.months > 0) {
    response = [
      ...response,
      `${interval.months} ${interval.months === 1 ? 'mes' : 'meses'}`
    ];
  }
  if (interval.days > 0) {
    response = [
      ...response,
      `${interval.days} ${interval.days === 1 ? 'dia' : 'dias'}`
    ];
  }
  if (interval.hours > 0) {
    response = [
      ...response,
      `${interval.hours.toFixed(0)} ${interval.hours === 1 ? 'hora' : 'horas'}`
    ];
  }
  return response.join(', ');
};
