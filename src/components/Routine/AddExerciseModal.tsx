import React, { useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { Exercise, addExercise, ExerciseItem } from 'modules/routine';
import AlertModal from 'lib/AlertModal';
import { categoryToKor } from 'lib/methods';
import Button from 'lib/Button';
import exerciseJSON from '../../data/exercise.json';

const AddExerciseBlock = styled.div<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  z-index: 100;
  top: ${(props) => (props.visible ? '5%' : '100%')};
  left: 5%;
  position: fixed;
  max-width: 480px;
  @media (min-width: 540px) {
    left: calc(50% - 240px);
  }
  width: 90%;
  height: 90%;
  border-radius: 0.5rem;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  background: white;
  overflow: hidden;
  transition: top 0.5s;
  h2 {
    align-self: center;
  }
`;

const CategoryListBlock = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 1rem;
  gap: 0.5rem;
`;

const CategoryItemBlock = styled.li<{ checked: number }>`
  display: flex;
  justify-content: center;
  padding: 0.25rem;
  border: 1px solid ${(props) => (props.checked ? '#00ffb3' : '#cccccc')};
  border-radius: 0.5rem;
  font-weight: ${(props) => props.checked && 'bold'};
  cursor: pointer;
`;

const ExerciseListBlock = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  background: #eeeeee;
  gap: 0.5rem;
  padding: 0.5rem;
  height: 100%;
`;

const ExerciseItemBlock = styled.li<{ isSelected: number }>`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: ${(props) => (props.isSelected ? '#00ffb3' : 'white')};
  transition: background 0.2s;
`;

const FooterBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const ConfirmBlock = styled.div`
  display: flex;
  gap: 0.5rem;
  div {
    display: grid;
    place-items: center;
    input {
      font-size: 2rem;
      width: 5rem;
    }
  }
`;

const ButtonsBlock = styled.div`
  display: flex;
  gap: 0.5rem;
  button {
    display: flex;
    padding: 0.25rem 0.5rem;
    border: 1px solid #cccccc;
    border-radius: 0.5rem;
    background: white;
    font-size: 1.25rem;
    cursor: pointer;
    &:hover {
      opacity: 0.75;
    }
    &:active {
      opacity: 0.5;
    }
  }
  .submit {
    padding: 0.25rem 0.5rem;
    border: 1px solid transparent;
    color: white;
    background: #00ffb3;
    font-size: 1.25rem;
  }
  .close {
    padding: 0.25rem 0.5rem;
    border: 1px solid #cccccc;
    font-size: 1.25rem;
  }
`;

type InputState = {
  weight: number;
  numberOfTimes: number;
  numberOfSets: number;
};

type InputAction = {
  type: string;
  payload: number;
};

const reducer = (state: InputState, action: InputAction) => {
  switch (action.type) {
    case 'CHANGE_WEIGHT':
      return { ...state, weight: action.payload };
    case 'CHANGE_NUM_OF_TIMES':
      return { ...state, numberOfTimes: action.payload };
    case 'CHANGE_NUM_OF_SETS':
      return { ...state, numberOfSets: action.payload };
    default:
      return state;
  }
};

type AddExerciseProps = {
  id: string | null;
  day: number | null;
  visible: boolean;
  onClose: () => void;
};

const AddExerciseModal = ({ id, day, visible, onClose }: AddExerciseProps) => {
  const exercise: Exercise[] = exerciseJSON;
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState<Exercise | null>(null);
  const [inputState, inputDispatch] = useReducer(reducer, {
    weight: 0,
    numberOfTimes: 0,
    numberOfSets: 0,
  });
  const [modal, setModal] = useState(false);
  const [text, setText] = useState('');

  const dispatch = useDispatch();
  const onSelect = (exercise: Exercise) => setSelected(exercise);
  const onChange = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 3) return;
    inputDispatch({
      type,
      payload: +e.target.value,
    });
  };
  const onAddExercise = () => {
    if (!id || day === null) return;
    if (!selected) {
      setText('운동 종류를 선택하세요.');
      onModal();
      return;
    }
    if (
      !inputState.weight ||
      !inputState.numberOfTimes ||
      !inputState.numberOfSets
    ) {
      setText('정확한 값을 입력하세요.');
      onModal();
      return;
    }
    const exercise: ExerciseItem = {
      exercise: selected,
      weight: inputState.weight,
      numberOfTimes: inputState.numberOfTimes,
      numberOfSets: inputState.numberOfSets,
    };
    dispatch(addExercise({ id, day, exercise }));
    onClose();
  };
  const onModal = () => {
    setModal(true);
    setTimeout(() => setModal(false), 2000);
  };

  return (
    <>
      <AlertModal visible={modal} text={text} />
      <AddExerciseBlock visible={visible}>
        <h2>운동 목록</h2>
        <CategoryListBlock>
          <CategoryItemBlock
            checked={category === 'all' ? 1 : 0}
            onClick={() => setCategory('all')}
          >
            전체
          </CategoryItemBlock>
          <CategoryItemBlock
            checked={category === 'upper' ? 1 : 0}
            onClick={() => setCategory('upper')}
          >
            상체
          </CategoryItemBlock>
          <CategoryItemBlock
            checked={category === 'lower' ? 1 : 0}
            onClick={() => setCategory('lower')}
          >
            하체
          </CategoryItemBlock>
          <CategoryItemBlock
            checked={category === 'core' ? 1 : 0}
            onClick={() => setCategory('core')}
          >
            코어
          </CategoryItemBlock>
        </CategoryListBlock>
        <ExerciseListBlock>
          {exercise
            .filter((exer) =>
              category === 'all' ? true : exer.category === category,
            )
            .map((exer) => (
              <ExerciseItemBlock
                onClick={() => onSelect(exer)}
                isSelected={selected === exer ? 1 : 0}
              >
                <b>{exer.name}</b>
                <span>
                  [{categoryToKor(exer.category)}] {exer.part}
                </span>
              </ExerciseItemBlock>
            ))}
        </ExerciseListBlock>
        <FooterBlock>
          <ConfirmBlock>
            <div className="weight">
              <b>중량</b>
              <input
                type="number"
                min={0}
                value={inputState.weight}
                onChange={(e) => onChange('CHANGE_WEIGHT', e)}
              />
              kg
            </div>
            <div className="numOfTimes">
              <b>횟수</b>
              <input
                type="number"
                min={0}
                value={inputState.numberOfTimes}
                onChange={(e) => onChange('CHANGE_NUM_OF_TIMES', e)}
              />
              회
            </div>
            <div className="numOfSets">
              <b>세트 수</b>
              <input
                type="number"
                min={0}
                value={inputState.numberOfSets}
                onChange={(e) => onChange('CHANGE_NUM_OF_SETS', e)}
              />
              세트
            </div>
          </ConfirmBlock>
          <ButtonsBlock>
            <Button className="submit" onClick={onAddExercise}>
              추가
            </Button>
            <Button className="close" onClick={onClose}>
              취소
            </Button>
          </ButtonsBlock>
        </FooterBlock>
      </AddExerciseBlock>
    </>
  );
};

export default AddExerciseModal;
