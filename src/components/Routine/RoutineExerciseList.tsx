import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { ExerciseItem, removeExercise } from 'modules/routine';
import useScroll from 'hooks/useScroll';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import Button from 'components/common/Button';

const ExerciseListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const ExerciseListBlock = styled.ul<{ editing: boolean }>`
  display: flex;
  flex-grow: 1;
  align-items: center;
  gap: 0.5rem;
  width: 0;
  height: 5rem;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  background: ${(props) =>
    props.editing
      ? (props) => props.theme.highlight_sub
      : (props) => props.theme.background_sub};
  overflow: hidden;
  transition: background 0.2s;
  scroll-behavior: smooth;
`;

const ExerciseItemBlock = styled.li<{ editing?: number }>`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  place-items: center;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  background: ${(props) => props.theme.background_base};
  transition: border 0.2s, opacity 0.2s;
  span {
    font-size: 0.8rem;
  }
  &:hover {
    ${(props) => props.editing && '1px solid red'};
    opacity: ${(props) => (props.editing ? 0.75 : 1)};
  }
  &:active {
    opacity: ${(props) => (props.editing ? 0.5 : 1)};
  }
`;

const AddExerciseButton = styled(AiOutlinePlus)<{ editing: number }>`
  display: flex;
  flex-shrink: 0;
  place-items: center;
  padding: 0.25rem;
  border-radius: 50%;
  color: ${(props) => props.theme.background_base};
  background: ${(props) => props.theme.highlight_main};
  font-size: 2rem;
  font-weight: bold;
  visibility: ${(props) => (props.editing ? '' : 'hidden')};
`;

const PrevScrollButton = styled(Button)<{ isEnd: boolean }>`
  position: absolute;
  z-index: 50;
  left: 0;
  height: 100%;
  color: ${(props) => props.theme.background_base};
  background: rgba(0, 0, 0, 0.2);
  font-size: 1.75rem;
`;

const NextScrollButton = styled(Button)<{ isEnd: boolean }>`
  z-index: 50;
  position: absolute;
  right: 0;
  height: 100%;
  color: ${(props) => props.theme.background_base};
  background: rgba(0, 0, 0, 0.2);
  font-size: 1.75rem;
`;

type RoutineExerciseListProps = {
  dayRoutine: ExerciseItem[];
  routineId?: string;
  dayIdx?: number;
  editing?: boolean;
  onOpenModal?: (day: number) => void;
};

const RoutineExerciseList = ({
  dayRoutine,
  routineId = '',
  dayIdx = -1,
  editing = false,
  onOpenModal,
}: RoutineExerciseListProps) => {
  const dispatch = useDispatch();
  const { ref, moveTo } = useScroll();
  const dr = useRef<ExerciseItem[]>(dayRoutine);

  useEffect(() => {
    if (dayRoutine.length <= 0) return;
    if (routineId && dr.current.length < dayRoutine.length) moveTo('end');
    else moveTo('init');
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
      <ExerciseListBlock ref={ref} editing={editing}>
        {dayRoutine.map((s, i) => (
          <ExerciseItemBlock
            editing={editing ? 1 : 0}
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
              {s.numberOfTimes} x {s.numberOfSets}
            </span>
          </ExerciseItemBlock>
        ))}
        {onOpenModal && (
          <Button
            onClick={
              dayIdx !== -1 && editing ? () => onOpenModal(dayIdx) : null
            }
          >
            <AddExerciseButton editing={editing ? 1 : 0} />
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
  routineId: '',
  dayIdx: -1,
  editing: false,
  onOpenModal: null,
};

export default React.memo(RoutineExerciseList);
