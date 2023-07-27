import dayjs from 'dayjs';

export const useDate = ({time}: {time: null | number | undefined}) => {
  const date = dayjs();
  const fullDateNow = date.format('DD.MM.YYYY');
  const timeNow = date.format('HH:mm');
  const dateArrived = dayjs(date.add(time!, 'hours')).format('DD.MM.YYYY');
  const timeArrived = date.add(time!, 'hours').format('HH:mm');

  return {
    fullDateNow,
    timeNow,
    dateArrived,
    timeArrived,
  };
};
