import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { performSelector } from 'modules/hooks';
import { Routine } from 'modules/routine';
import {
  MdRadioButtonUnchecked,
  MdOutlineCheckCircleOutline,
} from 'react-icons/md';
import { completePerform, initialPerform, toggleCheck } from 'modules/perform';
import { addCompleteDay } from 'modules/user';
import { dateToString } from 'lib/methods';
import AlertModal from 'lib/AlertModal';
import palette from 'lib/palette';

const PerformRoutineBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid ${palette.grey_main};
  border-radius: 0.5rem;
`;

const PerformExerciseBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid ${palette.grey_sub};
  border-radius: 0.5rem;
  overflow: hidden;
`;

const ExerciseBlock = styled.div<{ completed: boolean }>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  border-radius: 0 0 0.5rem 0;
  padding: 0.5rem;
  background: ${(props) =>
    props.completed ? palette.green_main : palette.grey_sub};
  transition: background 0.2s;
`;

const SetButton = styled.div<{ available: boolean }>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  place-items: center;
  padding: 0.25rem 0.5rem;
  font-size: 2rem;
  opacity: ${(props) => (props.available ? 1 : 0.25)};
  transition: opacity 0.2s;
  cursor: pointer;
  b {
    font-size: 0.75rem;
  }
`;

const CompleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background: ${palette.grey_sub};
  font-size: 1.5rem;
  font-weight: bold;
  &:active {
    background: ${palette.green_main};
  }
  cursor: pointer;
`;

type PerformRoutineProps = {
  currentRoutine: Routine | null;
};

const PerformRoutine = ({ currentRoutine }: PerformRoutineProps) => {
  const [modal, setModal] = useState(false);

  if (!currentRoutine) return <h4>사용 중인 루틴이 없습니다.</h4>;

  const performs = useSelector(performSelector);
  const dispatch = useDispatch();

  const day = new Date().getDay();
  const todayRoutine = currentRoutine.weekRoutine[day];

  useEffect(() => {
    if (currentRoutine.lastModified !== performs.lastModified)
      dispatch(
        initialPerform({
          lastModified: currentRoutine.lastModified,
          exerciseList: todayRoutine,
        }),
      );
  }, []);

  if (!todayRoutine.length) {
    return (
      <h4>
        <i># 오늘은 쉬는 날!</i>
      </h4>
    );
  }

  if (performs.completed)
    return (
      <h4>
        <b>오늘 운동을 완료했습니다.</b>
      </h4>
    );

  const onToggleCheck = (exerIdx: number, setIdx: number) =>
    dispatch(toggleCheck({ exerIdx, setIdx }));

  const isCompleted = () =>
    performs.list.reduce(
      (acc, exer) => acc + exer.setCheck.filter((a) => !a).length,
      0,
    ) === 0;

  const onComplete = () => {
    if (!isCompleted()) {
      setModal(true);
      setTimeout(() => setModal(false), 2000);
    } else {
      dispatch(
        addCompleteDay({ date: dateToString(new Date()), list: todayRoutine }),
      );
      dispatch(completePerform());
    }
  };

  return (
    <>
      <AlertModal visible={modal} text="남은 운동이 있습니다." />
      <PerformRoutineBlock>
        {performs.list.map((p, i) => (
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
                onClick={() => onToggleCheck(i, j)}
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
        <CompleteButton onClick={onComplete}>운동완료</CompleteButton>
      </PerformRoutineBlock>
    </>
  );
};

export default PerformRoutine;
