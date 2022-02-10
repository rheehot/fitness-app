import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { userSelector } from 'modules/hooks';
import { dateToString } from 'lib/methods';
import palette from 'lib/palette';
import { CompleteItem } from 'modules/user';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import Button from 'lib/Button';

const RecordCalendarBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CalendarList = styled.ul`
  display: grid;
  place-items: center;
  row-gap: 1rem;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  padding: 1rem 0.5rem;
  border: 1px solid ${palette.grey_main};
  border-radius: 0.5rem;
  @media (min-width: 430px) {
    row-gap: 2rem;
    padding: 2rem 0.5rem;
  }
`;

const CalendarItem = styled.li<{ performed: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.75rem;
  height: 1.75rem;
  padding: 0.25rem;
  border-radius: 50%;
  background: ${(props) => (props.performed ? palette.green_main : '')};
  font-size: 1rem;
  font-weight: bold;
  &:nth-of-type(7n + 1) {
    color: ${palette.red};
  }
  &:nth-of-type(7n) {
    color: ${palette.blue};
  }
  @media (min-width: 430px) {
    font-size: 1.25rem;
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const PrevButton = styled(MdNavigateBefore)`
  font-size: 3rem;
  border-radius: 50%;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;
const NextButton = styled(MdNavigateNext)`
  font-size: 3rem;
  border-radius: 50%;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const RecordCalendar = () => {
  const users = useSelector(userSelector);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [records, setRecords] = useState<CompleteItem[]>([]);

  const increaseMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else setMonth(month + 1);
  };
  const decreaseMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else setMonth(month - 1);
  };

  useEffect(() => {
    const firstDate = new Date(year, month);
    const tempRecords: CompleteItem[] = [];
    firstDate.setDate(1);

    for (let i = 0; i < 7; i += 1)
      if (i < firstDate.getDay())
        tempRecords.push({
          date: `${-i}`,
          list: [],
        });

    while (firstDate.getMonth() === month) {
      const r = users.completes.find((c) => c.date === dateToString(firstDate));
      tempRecords.push({
        date: `${firstDate.getDate()}`,
        list: r ? r.list : [],
      });
      firstDate.setDate(firstDate.getDate() + 1);
    }
    setRecords(tempRecords);
  }, [year, month]);

  return (
    <RecordCalendarBlock>
      <CalendarHeader>
        <Button onClick={decreaseMonth}>
          <PrevButton />
        </Button>
        <h1>
          {year}.{month + 1}
        </h1>
        <Button onClick={increaseMonth}>
          <NextButton />
        </Button>
      </CalendarHeader>
      <CalendarList>
        {records.map((d) => (
          <CalendarItem key={d.date} performed={d.list.length > 0}>
            {+d.date > 0 && d.date}
          </CalendarItem>
        ))}
      </CalendarList>
    </RecordCalendarBlock>
  );
};

export default RecordCalendar;
