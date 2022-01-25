import React from 'react';
import styled from '@emotion/styled';
import {
  changeTitle,
  removeExercise,
  removeRoutine,
  Routine,
} from 'modules/routine';
import { setCurrentRoutine } from 'modules/user';
import { numToDayOfWeek } from 'lib/methods';
import {
  BsTriangleFill,
  BsFillPlusCircleFill,
  BsStar,
  BsStarFill,
} from 'react-icons/bs';
import { MdOutlineEdit, MdCheck, MdRemoveCircleOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from 'modules/hooks';

const RoutineItemBlock = styled.li<{ visible: boolean; editing?: boolean }>`
  height: ${(props) => (props.visible ? '40rem' : '2.8rem')};
  padding: 0.5rem;
  border: 1px solid ${(props) => (props.editing ? '#00ffb3' : '#cccccc')};
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.5s;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .title {
      display: flex;
      place-items: center;
      font-weight: bold;
      font-size: 1.25rem;
      gap: 0.5rem;
    }
    .buttons {
      display: flex;
      place-items: center;
      gap: 0.5rem;
      font-size: 1.5rem;
      cursor: pointer;
    }
  }
`;

const RoutineDetail = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.5rem;
`;

const RoutineDetailItem = styled.li<{ editing?: boolean }>`
  display: flex;
  place-items: center;
  padding: 0.25rem;
  border-radius: 0.5rem;
  background: ${(props) => (props.editing ? '#dcfff5' : '#eeeeee')};
  transition: background 0.5s;
  .day {
    font-weight: bold;
    margin: 0 0.5rem 0 0;
  }
`;

const ExerciseList = styled.ul`
  display: flex;
  align-items: center;
  overflow: scroll hidden;
  gap: 0.5rem;
  height: 4.5rem;
`;

const ExerciseItem = styled.li<{ editing?: boolean }>`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  place-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  background: white;
  span {
    font-size: 0.8rem;
  }
  &:hover {
    opacity: ${(props) => props.editing && 0.5};
  }
`;

const DetailButton = styled(BsTriangleFill)<{ visible: number }>`
  cursor: pointer;
  transform: ${(props) => (props.visible ? 'rotate(180deg)' : 'rotate(90deg)')};
  transition: transform 0.25s;
`;

const RemoveRoutineButton = styled(MdRemoveCircleOutline)`
  color: #df2323;
`;

const SetCurrentRoutineButton = styled(BsStar)``;
const UnsetCurrentRoutineButton = styled(BsStarFill)`
  color: #ffd900;
`;

const AddExerciseButton = styled(BsFillPlusCircleFill)`
  display: flex;
  flex-shrink: 0;
  place-items: center;
  padding: 0.5rem;
  font-size: 3rem;
  opacity: 0.5;
  cursor: pointer;
  &:hover {
    opacity: 0.4;
  }
  &:active {
    opacity: 0.3;
  }
`;

type RoutineItemProps = {
  isCurrent?: boolean;
  routine: Routine;
  visible?: string | null;
  editing?: string | null;
  onToggleVisible?: (id: string) => void;
  onToggleEditing?: (id: string) => void;
  onOpenModal?: (day: number) => void;
};

const RoutineItem = ({
  isCurrent,
  routine,
  visible,
  editing,
  onToggleVisible,
  onToggleEditing,
  onOpenModal,
}: RoutineItemProps) => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const onRemoveRoutine = () => {
    if (user.currentRoutineId === routine.id) dispatch(setCurrentRoutine(null));
    dispatch(removeRoutine(routine.id));
  };

  return isCurrent ? (
    <RoutineItemBlock key={routine.id} visible>
      <div className="header">
        <div className="title">{routine.title}</div>
      </div>
      <RoutineDetail>
        {routine.weekRoutine.map((dayRoutine, dayIdx) => (
          <RoutineDetailItem>
            <span className="day">{numToDayOfWeek(dayIdx)}</span>
            <ExerciseList>
              {dayRoutine.map((s) => (
                <ExerciseItem>
                  <b>{s.exercise.name}</b>
                  <span>{s.weight} kg</span>
                  <span>
                    {s.numberOfSets} x {s.numberOfTimes}
                  </span>
                </ExerciseItem>
              ))}
            </ExerciseList>
          </RoutineDetailItem>
        ))}
      </RoutineDetail>
    </RoutineItemBlock>
  ) : (
    <RoutineItemBlock
      key={routine.id}
      visible={routine.id === visible}
      editing={routine.id === editing}
    >
      <div className="header">
        <div className="title">
          {onToggleVisible && (
            <DetailButton
              visible={routine.id === visible ? 1 : 0}
              onClick={() => onToggleVisible(routine.id)}
            />
          )}
          {routine.id === editing ? (
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
          {user.currentRoutineId && user.currentRoutineId === routine.id ? (
            <UnsetCurrentRoutineButton
              onClick={() => dispatch(setCurrentRoutine(null))}
            />
          ) : (
            <SetCurrentRoutineButton
              onClick={() => dispatch(setCurrentRoutine(routine.id))}
            />
          )}
          {onToggleEditing &&
            (routine.id === editing ? (
              <MdCheck
                onClick={() => onToggleEditing(routine.id)}
                style={{ color: '#00ffb3' }}
              />
            ) : (
              <MdOutlineEdit onClick={() => onToggleEditing(routine.id)} />
            ))}
          <RemoveRoutineButton onClick={onRemoveRoutine} />
        </div>
      </div>
      <RoutineDetail>
        {routine.weekRoutine.map((dayRoutine, dayIdx) => (
          <RoutineDetailItem editing={routine.id === editing}>
            <span className="day">{numToDayOfWeek(dayIdx)}</span>
            <ExerciseList>
              {dayRoutine.map((s, i) => (
                <ExerciseItem
                  editing={routine.id === editing}
                  onClick={() =>
                    routine.id === editing &&
                    dispatch(
                      removeExercise({
                        id: routine.id,
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
                </ExerciseItem>
              ))}
              {onOpenModal && routine.id === editing && (
                <AddExerciseButton onClick={() => onOpenModal(dayIdx)} />
              )}
            </ExerciseList>
          </RoutineDetailItem>
        ))}
      </RoutineDetail>
    </RoutineItemBlock>
  );
};

RoutineItem.defaultProps = {
  isCurrent: false,
  visible: null,
  editing: null,
  onToggleVisible: null,
  onToggleEditing: null,
  onOpenModal: null,
};

export default RoutineItem;
