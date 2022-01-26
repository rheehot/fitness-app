import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { performSelector, routineSelector } from 'modules/hooks';
import { Routine } from 'modules/routine';
import {
  MdRadioButtonUnchecked,
  MdOutlineCheckCircleOutline,
} from 'react-icons/md';
import { initialPerform, toggleCheck } from 'modules/perform';

const PerformRoutineBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #cccccc;
  border-radius: 0.5rem;
`;

const PerformExerciseBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ExerciseBlock = styled.div<{ completed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background: ${(props) => (props.completed ? '#00ffb3' : '#eeeeee')};
  transition: background 0.2s;
`;

const SetButton = styled.div<{ available: boolean }>`
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  place-items: center;
  padding: 0.5rem;
  cursor: pointer;
  opacity: ${(props) => (props.available ? 1 : 0.25)};
  transition: opacity 0.2s;
  b {
    font-size: 0.75rem;
  }
`;

type PerformRoutineProps = {
  id: string | null;
};

const PerformRoutine = ({ id }: PerformRoutineProps) => {
  if (!id) return <h4>사용 중인 루틴이 없습니다.</h4>;

  const routines = useSelector(routineSelector);
  const performs = useSelector(performSelector);
  const dispatch = useDispatch();

  const day = new Date().getDay();
  const routine = routines.find((r) => r.id === id) as Routine;
  const todayRoutine = routine.weekRoutine[day];

  useEffect(() => {
    if (routine.lastModified !== performs.lastModified)
      dispatch(
        initialPerform({
          lastModified: routine.lastModified,
          exerciseList: todayRoutine,
        }),
      );
  }, []);

  const onToggleCheck = (name: string, idx: number) =>
    dispatch(toggleCheck({ name, idx }));

  if (performs.list.length === 0)
    return (
      <h4>
        <i># 오늘은 쉬는 날!</i>
      </h4>
    );

  return (
    <PerformRoutineBlock>
      {performs.list.map((p) => (
        <PerformExerciseBlock>
          <ExerciseBlock completed={!p.setCheck.filter((a) => !a).length}>
            <b>{p.exercise.exercise.name}</b>
            <span>
              {p.exercise.weight}kg, {p.exercise.numberOfTimes}회
            </span>
          </ExerciseBlock>
          {p.setCheck.map((a, j) => (
            <SetButton
              available={j === 0 || p.setCheck[j - 1]}
              onClick={() => onToggleCheck(p.exercise.exercise.name, j)}
            >
              {p.setCheck[j] ? (
                <MdOutlineCheckCircleOutline />
              ) : (
                <MdRadioButtonUnchecked />
              )}
              <b>{j + 1}세트</b>
            </SetButton>
          ))}
        </PerformExerciseBlock>
      ))}
    </PerformRoutineBlock>
  );
};

export default PerformRoutine;
