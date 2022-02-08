import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { ExerciseItem, removeExercise } from 'modules/routine';
import useScroll from 'hooks/useScroll';
import Button from 'lib/Button';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const ExerciseListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ExerciseListBlock = styled.ul`
  display: flex;
  flex-grow: 1;
  align-items: center;
  gap: 0.5rem;
  width: 0;
  height: 4.5rem;
  overflow: hidden;
  scroll-behavior: smooth;
`;

const ExerciseItemBlock = styled.li<{ editing?: boolean }>`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  place-items: center;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  background: white;
  transition: border 0.2s, opacity 0.2s;
  span {
    font-size: 0.8rem;
  }
  &:hover {
    border: ${(props) => props.editing && '1px solid red'};
    opacity: ${(props) => props.editing && 0.75};
  }
  &:active {
    opacity: ${(props) => props.editing && 0.5};
  }
`;

const AddExerciseButton = styled(AiOutlinePlus)`
  display: flex;
  flex-shrink: 0;
  place-items: center;
  padding: 0.25rem;
  color: white;
  background: #00ffb3;
  border-radius: 50%;
  font-size: 2rem;
  font-weight: bold;
`;

const PrevScrollButton = styled(Button)`
  border-radius: 0.5rem 0 0 0.5rem;
  margin-right: 0.5rem;
  color: white;
  background: #cccccc;
  font-size: 1.5rem;
`;

const NextScrollButton = styled(Button)`
  border-radius: 0 0.5rem 0.5rem 0;
  margin-left: 0.5rem;
  color: white;
  background: #cccccc;
  font-size: 1.5rem;
`;

type RoutineExerciseListProps = {
  dayRoutine: ExerciseItem[];
  dayIdx: number;
  routineId: string;
  editing: boolean;
  onOpenModal?: (day: number) => void;
};

const RoutineExerciseList = ({
  dayRoutine,
  dayIdx,
  routineId,
  editing,
  onOpenModal,
}: RoutineExerciseListProps) => {
  const dispatch = useDispatch();

  const ref = useRef<HTMLUListElement>(null);
  const { moveTo } = useScroll(ref);

  const dr = useRef<ExerciseItem[]>(dayRoutine);
  useEffect(() => {
    if (dr.current.length < dayRoutine.length) moveTo('end');
    dr.current = dayRoutine;
  }, [dayRoutine]);

  return (
    <ExerciseListWrapper>
      <PrevScrollButton onClick={() => moveTo('prev')}>
        <MdNavigateBefore />
      </PrevScrollButton>
      <ExerciseListBlock ref={ref}>
        {dayRoutine.map((s, i) => (
          <ExerciseItemBlock
            editing={editing}
            onClick={() =>
              editing &&
              dispatch(
                removeExercise({
                  id: routineId,
                  day: dayIdx,
                  idx: i,
                }),
              )
            }
          >
            <b>{s.exercise.name}</b>
            <span>{s.weight} kg</span>
            <span>
              {s.numberOfSets} x {s.numberOfTimes}
            </span>
          </ExerciseItemBlock>
        ))}
        {onOpenModal && editing && (
          <Button onClick={() => onOpenModal(dayIdx)}>
            <AddExerciseButton />
          </Button>
        )}
      </ExerciseListBlock>
      <NextScrollButton onClick={() => moveTo('next')}>
        <MdNavigateNext />
      </NextScrollButton>
    </ExerciseListWrapper>
  );
};

RoutineExerciseList.defaultProps = {
  onOpenModal: null,
};

export default React.memo(RoutineExerciseList);
