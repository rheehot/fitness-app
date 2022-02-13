export const dayidxToDaystr = (n: number) =>
  n >= 0 && n < 7 ? ['일', '월', '화', '수', '목', '금', '토'][n] : 'undefined';

export const datestrToDayidx = (str: string) => {
  const d = new Date(str);
  return d.getDay();
};

export const getDatestr = (date: Date) =>
  `${date.getFullYear()}-${
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  }-${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}`;

export const getKorCategory = (str: string) => {
  switch (str) {
    case 'upper':
      return '상체';
    case 'lower':
      return '하체';
    case 'core':
      return '코어';
    default:
      return str;
  }
};

export const getWeekDate = (date: Date) => {
  date.setDate(date.getDate() - date.getDay()); // this week, sunday
  date.setHours(0, 0, 0, 0);
  const result = [date];

  while (result.length < 7) {
    const a = new Date(date);
    a.setDate(a.getDate() + result.length);
    result.push(a);
  }

  return result;
};
