import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Exercise } from 'modules/routine';
import { MdOutlineClose } from 'react-icons/md';
import exerciseJSON from '../data/exercise.json';

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
  h1 {
    align-self: center;
  }
`;

const CategoryList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 1rem;
  gap: 0.5rem;
`;

const CategoryItem = styled.li<{ checked: number }>`
  display: flex;
  justify-content: center;
  padding: 0.25rem;
  border: 1px solid ${(props) => (props.checked ? '#00ffb3' : '#cccccc')};
  border-radius: 0.5rem;
  font-weight: ${(props) => props.checked && 'bold'};
  cursor: pointer;
`;

const ExerciseList = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  background: #eeeeee;
  gap: 0.5rem;
  padding: 0.5rem;
  height: 100%;
`;

const ExerciseItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: white;
`;

const CloseButton = styled.button`
  display: flex;
  border: none;
  background: #cccccc;
  border-radius: 0 0 0 0.5rem;
  color: white;
  font-size: 2rem;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  &:hover {
    opacity: 0.75;
  }
  &:active {
    opacity: 0.5;
  }
`;

type AddExerciseProps = {
  visible: boolean;
  onClose: () => void;
};

const AddExercise = ({ visible, onClose }: AddExerciseProps) => {
  const exercise: Exercise[] = exerciseJSON;
  const [category, setCategory] = useState('all');

  return (
    <AddExerciseBlock visible={visible}>
      <CloseButton type="button" onClick={onClose}>
        <MdOutlineClose />
      </CloseButton>
      <h1>운동 목록</h1>
      <CategoryList>
        <CategoryItem
          checked={category === 'all' ? 1 : 0}
          onClick={() => setCategory('all')}
        >
          전체
        </CategoryItem>
        <CategoryItem
          checked={category === 'upper' ? 1 : 0}
          onClick={() => setCategory('upper')}
        >
          상체
        </CategoryItem>
        <CategoryItem
          checked={category === 'lower' ? 1 : 0}
          onClick={() => setCategory('lower')}
        >
          하체
        </CategoryItem>
        <CategoryItem
          checked={category === 'core' ? 1 : 0}
          onClick={() => setCategory('core')}
        >
          코어
        </CategoryItem>
      </CategoryList>
      <ExerciseList>
        {exercise
          .filter((exer) =>
            category === 'all' ? true : exer.category === category,
          )
          .map((exer) => (
            <ExerciseItem>
              <b>{exer.name}</b>
              <span>
                {exer.category} - {exer.part}
              </span>
            </ExerciseItem>
          ))}
      </ExerciseList>
    </AddExerciseBlock>
  );
};

export default AddExercise;
