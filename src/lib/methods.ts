export const numToDayOfWeek = (n: number) =>
  n >= 0 && n < 7 ? ['일', '월', '화', '수', '목', '금', '토'][n] : 'undefined';
