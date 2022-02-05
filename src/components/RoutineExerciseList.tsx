import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { ExerciseItem, removeExercise } from 'modules/routine';
import useScroll from 'hooks/useScroll';
import Button from 'lib/Button';
import { AiOutlinePlus } from 'react-icons/ai';

const ExerciseListBlock = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 4.5rem;
  overflow: hidden;
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
  const viewWidth = document.documentElement.clientWidth;
  const { moveNext } = useScroll(ref, viewWidth);

  return (
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
        <Button>
          <AddExerciseButton onClick={() => onOpenModal(dayIdx)} />
        </Button>
      )}
    </ExerciseListBlock>
  );
};

RoutineExerciseList.defaultProps = {
  onOpenModal: null,
};

export default React.memo(RoutineExerciseList);
