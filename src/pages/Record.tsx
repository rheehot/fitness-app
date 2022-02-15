import React, { useEffect, useState } from 'react';
import Template from 'templates/Template';
import RecordCalendar from 'components/Record/RecordCalendar';
import { useSelector } from 'react-redux';
import { userSelector } from 'modules/hooks';
import { CompleteItem } from 'modules/user';
import { getDatestr } from 'lib/methods';
import RoutineExerciseList from 'components/Routine/RoutineExerciseList';
import styled from '@emotion/styled';
import palette from 'lib/palette';

const MemoBlock = styled.div`
  background: ${palette.memo_body};
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

const RecordPage = () => {
  const users = useSelector(userSelector);
  const [currentDate, setCurrentDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const [records, setRecords] = useState<CompleteItem[]>([]);
  const [selected, setSelected] = useState<CompleteItem | null>(null);

  const increaseMonth = () => {
    if (currentDate.month >= 11) {
      setCurrentDate({
        year: currentDate.year + 1,
        month: 0,
      });
    } else
      setCurrentDate({
        ...currentDate,
        month: currentDate.month + 1,
      });
  };

  const decreaseMonth = () => {
    if (currentDate.month <= 0) {
      setCurrentDate({
        year: currentDate.year - 1,
        month: 11,
      });
    } else
      setCurrentDate({
        ...currentDate,
        month: currentDate.month - 1,
      });
  };

  const setDateNow = () =>
    setCurrentDate({
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    });

  const onSelect = (e: React.MouseEvent) => {
    const elem = (e.target as HTMLLIElement).closest('li');
    if (!elem || !elem.textContent) return;

    const info = records.find(
      (r) =>
        r.date ===
        getDatestr(
          new Date(
            currentDate.year,
            currentDate.month,
            +(elem.textContent as string),
          ),
        ),
    );
    if (!info) return;

    setSelected(info);
  };

  useEffect(() => {
    const firstDate = new Date(currentDate.year, currentDate.month);
    const tempRecords: CompleteItem[] = [];
    firstDate.setDate(1);

    for (let i = 0; i < 7; i += 1)
      if (i < firstDate.getDay())
        tempRecords.push({
          date: `${-i}`,
          list: [],
          memo: '',
        });

    while (firstDate.getMonth() === currentDate.month) {
      const r = users.completes.find((c) => c.date === getDatestr(firstDate));
      tempRecords.push({
        date: getDatestr(firstDate),
        list: r ? r.list : [],
        memo: r ? r.memo : '',
      });
      firstDate.setDate(firstDate.getDate() + 1);
    }
    setRecords(tempRecords);

    return () => {
      document.onclick = null;
      window.onresize = null;
    };
  }, [currentDate]);

  return (
    <Template>
      <RecordCalendar
        date={currentDate}
        records={records}
        selectedDate={selected ? selected.date : null}
        onIncrease={increaseMonth}
        onDecrease={decreaseMonth}
        onDateNow={setDateNow}
        onSelect={onSelect}
      />
      <hr />
      {selected && selected.list.length > 0 ? (
        <>
          <span>
            {selected.date.slice(5, 7)}월 {selected.date.slice(8, 10)}일
          </span>
          <h2 style={{ marginTop: 0 }}>수행한 운동</h2>
          <RoutineExerciseList dayRoutine={selected.list} />
          <h2>메모</h2>
          <MemoBlock>{selected.memo}</MemoBlock>
        </>
      ) : (
        <h4>수행한 운동이 없습니다.</h4>
      )}
    </Template>
  );
};

export default RecordPage;
