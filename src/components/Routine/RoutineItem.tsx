import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { setCurrentRoutine } from 'modules/user';
import { changeTitle, removeRoutine, Routine } from 'modules/routine';
import { userSelector } from 'modules/hooks';
import Button from 'components/common/Button';
import { dayidxToDaystr } from 'lib/methods';
import { BsTriangleFill, BsStar, BsStarFill } from 'react-icons/bs';
import { MdCheck } from 'react-icons/md';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import RoutineExerciseList from './RoutineExerciseList';

const RoutineItemBlock = styled.li<{ visible: boolean; editing?: boolean }>`
  height: ${({ visible }) => (visible ? '42rem' : '3rem')};
  padding: 0.5rem;
  border: 1px solid
    ${({ editing, theme }) => (editing ? theme.primary : theme.border_main)};
  border-radius: 0.5rem;
  overflow: hidden;
  transition: border 0.2s, height 0.5s;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      height: 2rem;
      display: flex;
      place-items: center;
      gap: 0.5rem;
      min-width: 0;
      font-weight: bold;
      font-size: 1.25rem;
      white-space: nowrap;
      overflow: hidden;
      input {
        min-width: 0;
        font-size: 1.025rem;
        margin-right: 0.5rem;
      }
    }
    .buttons {
      display: flex;
      place-items: center;
      gap: 0.5rem;
      font-size: 1.5rem;
    }
  }
`;

const DaySpan = styled.div<{ dayIdx: number }>`
  margin: 0 0.25rem 0 0;
  font-weight: bold;
  color: ${({ dayIdx, theme }) => {
    if (dayIdx === 0) return theme.red;
    if (dayIdx === 6) return theme.blue;
    return 'letter_main';
  }};
`;

const DetailButton = styled(BsTriangleFill)<{ visible: number }>`
  flex-shrink: 0;
  transform: ${({ visible }) => (visible ? 'rotate(180deg)' : 'rotate(90deg)')};
  transition: transform 0.2s;
`;

const RoutineDetailBlock = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
`;

const RoutineDetailItem = styled.li`
  display: flex;
  place-items: center;
  padding: 0.25rem;
  border-radius: 0.5rem;
  overflow: hidden;
  .list {
    flex-grow: 1;
  }
`;

const RemoveRoutineButton = styled(FaTrashAlt)`
  color: ${({ theme }) => theme.red};
`;

const SetCurrentRoutineButton = styled(BsStar)``;

const UnsetCurrentRoutineButton = styled(BsStarFill)`
  color: ${({ theme }) => theme.yellow};
`;

const CheckButton = styled(MdCheck)`
  margin: -0.25rem;
  color: ${({ theme }) => theme.primary};
  font-size: 2rem;
`;

type RoutineItemProps = {
  routine: Routine;
  isVisible: boolean;
  isEditing: boolean;
  onOpenModal: (day: number) => void;
  onVisible: (id: string) => void;
  onInvisible: () => void;
  onEditing: (id: string) => void;
  onUnediting: () => void;
};

const RoutineItem = ({
  routine,
  isVisible = false,
  isEditing = false,
  onOpenModal,
  onVisible,
  onInvisible,
  onEditing,
  onUnediting,
}: RoutineItemProps) => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const onRemoveRoutine = () => {
    if (user.currentRoutine && user.currentRoutine.id === routine.id)
      dispatch(setCurrentRoutine(null));
    dispatch(removeRoutine(routine.id));
  };

  useEffect(() => {
    if (user.currentRoutine?.id === routine.id)
      dispatch(setCurrentRoutine(routine));
  }, [routine.lastModified]);

  return (
    <RoutineItemBlock key={routine.id} visible={isVisible} editing={isEditing}>
      <div className="header">
        <div className="title">
          {onVisible && onInvisible && (
            <Button>
              <DetailButton
                visible={isVisible ? 1 : 0}
                onClick={isVisible ? onInvisible : () => onVisible(routine.id)}
              />
            </Button>
          )}
          {isEditing ? (
            <input
              type="text"
              value={routine.title}
              maxLength={12}
              onChange={(e) =>
                dispatch(changeTitle({ id: routine.id, value: e.target.value }))
              }
            />
          ) : (
            routine.title
          )}
        </div>
        <div className="buttons">
          {user.currentRoutine?.id === routine.id ? (
            <Button>
              <UnsetCurrentRoutineButton
                onClick={() => dispatch(setCurrentRoutine(null))}
              />
            </Button>
          ) : (
            <Button>
              <SetCurrentRoutineButton
                onClick={() => dispatch(setCurrentRoutine(routine))}
              />
            </Button>
          )}
          {onEditing &&
            onUnediting &&
            (isEditing ? (
              <Button>
                <CheckButton onClick={onUnediting} />
              </Button>
            ) : (
              <Button>
                <FaPencilAlt onClick={() => onEditing(routine.id)} />
              </Button>
            ))}
          <Button>
            <RemoveRoutineButton onClick={onRemoveRoutine} />
          </Button>
        </div>
      </div>
      <RoutineDetailBlock>
        {routine.weekRoutine.map((dayRoutine, dayIdx) => (
          <RoutineDetailItem>
            <DaySpan dayIdx={dayIdx}>{dayidxToDaystr(dayIdx)}</DaySpan>
            <div className="list">
              <RoutineExerciseList
                dayRoutine={dayRoutine}
                dayIdx={dayIdx}
                routineId={routine.id}
                editing={isEditing}
                onOpenModal={onOpenModal}
              />
            </div>
          </RoutineDetailItem>
        ))}
      </RoutineDetailBlock>
    </RoutineItemBlock>
  );
};

export default React.memo(RoutineItem);
