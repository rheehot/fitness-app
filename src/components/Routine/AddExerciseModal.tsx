import React from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { Exercise, addExercise, ExerciseItem } from 'modules/routine';
import AlertModal from 'components/common/AlertModal';
import Button from 'components/common/Button';
import useAddExercise from 'hooks/useAddExercise';
import { getKorCategory } from 'lib/methods';
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
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 0.5rem;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  background: ${(props) => props.theme.background_main};
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

const CategoryItemBlock = styled(Button)<{ checked: number }>`
  padding: 0.25rem;
  border: 1px solid
    ${(props) =>
      props.checked ? props.theme.highlight_main : props.theme.border};
`;

const ExerciseListBlock = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  background: ${(props) => props.theme.background_sub};
  gap: 0.5rem;
  padding: 0.5rem;
  height: 100%;
`;

const ExerciseItemBlock = styled.li<{ isSelected: number }>`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: ${(props) =>
    props.isSelected
      ? props.theme.highlight_main
      : props.theme.background_main};
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
  .submit {
    padding: 0.25rem 0.5rem;
    border: 1px solid transparent;
    background: ${(props) => props.theme.highlight_main};
    font-size: 1.25rem;
  }
  .close {
    padding: 0.25rem 0.5rem;
    background: ${(props) => props.theme.background_sub};
    font-size: 1.25rem;
  }
`;

type AddExerciseProps = {
  id: string | null;
  day: number | null;
  visible: boolean;
  onClose: () => void;
};

const AddExerciseModal = ({ id, day, visible, onClose }: AddExerciseProps) => {
  const exercise: Exercise[] = exerciseJSON;
  const dispatch = useDispatch();
  const {
    addState,
    onSetCategory,
    onSelectExercise,
    onChangeInput,
    onCheckInputs,
  } = useAddExercise();

  const onAddExercise = () => {
    if (!id || day === null) return;
    if (!onCheckInputs()) return;
    const exercise: ExerciseItem = {
      exercise: addState.selected as Exercise,
      weight: addState.inputs.weight,
      numberOfTimes: addState.inputs.numberOfTimes,
      numberOfSets: addState.inputs.numberOfSets,
    };
    dispatch(addExercise({ id, day, exercise }));
    onClose();
  };

  return (
    <>
      <AlertModal visible={addState.alertVisible} text={addState.alertText} />
      <AddExerciseBlock visible={visible}>
        <h2>운동 목록</h2>
        <CategoryListBlock>
          <CategoryItemBlock
            checked={addState.category === 'all' ? 1 : 0}
            onClick={() => onSetCategory('all')}
          >
            전체
          </CategoryItemBlock>
          <CategoryItemBlock
            checked={addState.category === 'upper' ? 1 : 0}
            onClick={() => onSetCategory('upper')}
          >
            상체
          </CategoryItemBlock>
          <CategoryItemBlock
            checked={addState.category === 'lower' ? 1 : 0}
            onClick={() => onSetCategory('lower')}
          >
            하체
          </CategoryItemBlock>
          <CategoryItemBlock
            checked={addState.category === 'core' ? 1 : 0}
            onClick={() => onSetCategory('core')}
          >
            코어
          </CategoryItemBlock>
        </CategoryListBlock>
        <ExerciseListBlock>
          {exercise
            .filter((exer) =>
              addState.category === 'all'
                ? true
                : exer.category === addState.category,
            )
            .map(
              (exer) => (
                <ExerciseItemBlock
                  onClick={() => onSelectExercise(exer)}
                  isSelected={addState.selected === exer ? 1 : 0}
                >
                  <b>{exer.name}</b>
                  <span>
                    [{getKorCategory(exer.category)}] {exer.part}
                  </span>
                </ExerciseItemBlock>
              ),
              [addState.category, addState.selected],
            )}
        </ExerciseListBlock>
        <FooterBlock>
          <ConfirmBlock>
            <div className="weight">
              <b>중량</b>
              <input
                type="number"
                min={0}
                value={addState.inputs.weight}
                onChange={(e) => onChangeInput('CHANGE_WEIGHT', e)}
              />
              kg
            </div>
            <div className="numOfTimes">
              <b>횟수</b>
              <input
                type="number"
                min={0}
                value={addState.inputs.numberOfTimes}
                onChange={(e) => onChangeInput('CHANGE_NUM_OF_TIMES', e)}
              />
              회
            </div>
            <div className="numOfSets">
              <b>세트 수</b>
              <input
                type="number"
                min={0}
                max={20}
                value={addState.inputs.numberOfSets}
                onChange={(e) => onChangeInput('CHANGE_NUM_OF_SETS', e)}
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

export default React.memo(AddExerciseModal);
