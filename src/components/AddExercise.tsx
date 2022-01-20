import React from 'react';
import { Exercise } from 'modules/routine';
import exerciseJSON from '../data/exercise.json';

const AddExercise = () => {
  const exercise: Exercise[] = exerciseJSON;
  return (
    <div>
      <h1>운동 목록</h1>
      <ul>
        {exercise.map((exer) => (
          <li>
            <h4>{exer.name}</h4>
            <p>{exer.category}</p>
            <p>{exer.part}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddExercise;
