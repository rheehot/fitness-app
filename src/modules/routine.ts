import { createSlice } from '@reduxjs/toolkit';
import exerciseJSON from '../data/exercise.json';

const exercise: Exercise[] = exerciseJSON;

export type Exercise = {
  name: string;
  category: string;
  part: string[];
  imageSrc?: string;
  description?: string;
};

export type ExerciseItem = {
  exercise: Exercise;
  weight: number;
  numberOfTimes: number;
  numberOfSets: number;
};

export type Routine = {
  id: string;
  title: string;
  lastModified: number;
  weekRoutine: [
    ExerciseItem[],
    ExerciseItem[],
    ExerciseItem[],
    ExerciseItem[],
    ExerciseItem[],
    ExerciseItem[],
    ExerciseItem[],
  ];
};

export type RoutineStateType = Routine[];

const initialState: RoutineStateType = [
  {
    id: '0',
    title: '테스트',
    lastModified: Date.now(),
    weekRoutine: [
      [],
      [
        {
          exercise: exercise[0],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: exercise[1],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: exercise[3],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
      ],
      [
        {
          exercise: exercise[2],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: exercise[4],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: exercise[1],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
      ],
      [],
      [
        {
          exercise: exercise[5],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: exercise[6],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
      ],
      [
        {
          exercise: exercise[1],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
      ],
      [],
    ],
  },
  {
    id: '1',
    title: '1번',
    lastModified: Date.now() + 1,
    weekRoutine: [
      [],
      [
        {
          exercise: exercise[8],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: exercise[7],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
      ],
      [
        {
          exercise: exercise[6],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: exercise[9],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: exercise[5],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
      ],
      [
        {
          exercise: exercise[6],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
      ],
      [
        {
          exercise: exercise[1],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: exercise[0],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
      ],
      [
        {
          exercise: exercise[5],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: exercise[9],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: exercise[6],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: exercise[1],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: exercise[0],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
      ],
      [
        {
          exercise: exercise[0],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: exercise[1],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: exercise[2],
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
      ],
    ],
  },
];

export const routineSlice = createSlice({
  name: 'routines',
  initialState,
  reducers: {
    changeTitle: (
      state,
      { payload: { id, value } }: { payload: { id: string; value: string } },
    ) => {
      const r = state.find((s) => s.id === id);
      if (!r) return;
      r.title = value;
    },
    addRoutine: (state, { payload }: { payload: Routine }) => {
      state.push(payload);
    },
    removeRoutine: (state, { payload }: { payload: string }) => {
      const filtered = state.filter((routine) => routine.id !== payload);
      return filtered;
    },
    addExercise: (
      state,
      {
        payload: { id, day, exercise },
      }: { payload: { id: string; day: number; exercise: ExerciseItem } },
    ) => {
      const r = state.find((s) => s.id === id);
      if (!r) return;
      const days = r.weekRoutine[day];
      if (!days) return;
      const newDays = [...days, exercise];
      r.weekRoutine[day] = newDays;
      r.lastModified = Date.now();
    },
    removeExercise: (
      state,
      {
        payload: { id, day, idx },
      }: { payload: { id: string; day: number; idx: number } },
    ) => {
      const r = state.find((s) => s.id === id);
      if (!r) return;
      const days = r.weekRoutine[day];
      if (!days) return;
      const newDays = days.filter((day, i) => i !== idx);
      r.weekRoutine[day] = newDays;
      r.lastModified = Date.now();
    },
  },
});

export const {
  changeTitle,
  addRoutine,
  removeRoutine,
  addExercise,
  removeExercise,
} = routineSlice.actions;

export default routineSlice.reducer;
