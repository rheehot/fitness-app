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
  overflow-x: scroll;
`;

const ExerciseBlock = styled.div<{ completed: boolean }>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background: ${(props) => (props.completed ? '#00ffb3' : '#eeeeee')};
  transition: background 0.2s;
`;

const SetButton = styled.div<{ available: boolean }>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  place-items: center;
  padding: 0.5rem;
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
  background: #eeeeee;
  font-size: 1.5rem;
  font-weight: bold;
  &:active {
    background: #00ffb3;
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
