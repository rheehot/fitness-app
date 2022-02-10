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
  align-items: center;
  position: relative;
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
  & > *:first-child {
    margin-left: 2.5rem;
  }
  & > *:last-child {
    margin-right: 2.5rem;
  }
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

const AddExerciseButton = styled(AiOutlinePlus)<{ editing: boolean }>`
  display: flex;
  flex-shrink: 0;
  place-items: center;
  padding: 0.25rem;
  border-radius: 50%;
  color: white;
  background: #00ffb3;
  font-size: 2rem;
  font-weight: bold;
  visibility: ${(props) => (props.editing ? '' : 'hidden')};
`;

const PrevScrollButton = styled(Button)<{ isEnd: boolean }>`
  position: absolute;
  height: 100%;
  left: 0;
  color: white;
  background: rgba(0, 0, 0, 0.25);
  font-size: 1.75rem;
`;

const NextScrollButton = styled(Button)<{ isEnd: boolean }>`
  position: absolute;
  height: 100%;
  right: 0;
  color: white;
  background: rgba(0, 0, 0, 0.25);
  font-size: 1.75rem;
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
      <PrevScrollButton
        onClick={() => moveTo('prev')}
        isEnd={ref.current?.scrollLeft === 0}
      >
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
        {onOpenModal && (
          <Button onClick={editing ? () => onOpenModal(dayIdx) : null}>
            <AddExerciseButton editing={editing} />
          </Button>
        )}
      </ExerciseListBlock>
      <NextScrollButton
        onClick={() => moveTo('next')}
        isEnd={
          ref.current
            ? ref.current.scrollLeft ===
              ref.current.scrollWidth - ref.current.clientWidth
            : false
        }
      >
        <MdNavigateNext />
      </NextScrollButton>
    </ExerciseListWrapper>
  );
};

RoutineExerciseList.defaultProps = {
  onOpenModal: null,
};

export default React.memo(RoutineExerciseList);
