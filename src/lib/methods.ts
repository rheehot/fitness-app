export const numToDayOfWeek = (n: number) =>
  n >= 0 && n < 7 ? ['일', '월', '화', '수', '목', '금', '토'][n] : 'undefined';

export const dateStringToDay = (str: string) => {
  const d = new Date(str);
  return d.getDay();
};

export const convertDateToStr = (date: Date) =>
  `${date.getFullYear()}-${
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  }-${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}`;

export const getWeekDate = (str: string) => {
  const d = new Date(str);
  d.setDate(d.getDate() - d.getDay()); // this week, sunday
  const result = [d];

  while (result.length < 7) {
    const a = new Date(d);
    a.setDate(a.getDate() + result.length);
    result.push(a);
  }

  return result;
};
