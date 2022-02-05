import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ExerciseItem } from 'modules/routine';
import { useSelector } from 'react-redux';
import { userSelector } from 'modules/hooks';
import { dateToString } from 'lib/methods';

const RecordCalendarBlock = styled.div``;

const CalendarList = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const CalendarItem = styled.li`
  padding: 1rem;
`;

type RecordCalendarProps = {
  initialMonth: number;
};

const RecordCalendar = ({ initialMonth }: RecordCalendarProps) => {
  const users = useSelector(userSelector);
  const [month, setMonth] = useState(initialMonth);
  const dates = [];

  // initial calendar.
  const firstDate = new Date();
  firstDate.setDate(1);

  for (let i = 0; i < 7; i += 1) if (i < firstDate.getDay()) dates.push({});

  const today = new Date();
  while (firstDate.getMonth() === today.getMonth()) {
    dates.push({
      date: firstDate.getDate(),
      list: users.completes.find((c) => c.date === dateToString(firstDate))
        ?.list,
    });
    firstDate.setDate(firstDate.getDate() + 1);
  }

  return (
    <RecordCalendarBlock>
      <CalendarList>
        {dates.map((d) => (
          <CalendarItem key={d.date}>
            {d.date}
            {d.list?.length && JSON.stringify(d.list)}
          </CalendarItem>
        ))}
      </CalendarList>
    </RecordCalendarBlock>
  );
};

export default RecordCalendar;
