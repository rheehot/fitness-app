import { createSlice } from '@reduxjs/toolkit';

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

const initialState: RoutineStateType = [];

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
      const newDays = days.filter((x, i) => i !== idx);
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
