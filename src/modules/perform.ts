import { createSlice } from '@reduxjs/toolkit';
import { ExerciseItem } from './routine';

export type PerformItem = {
  exercise: ExerciseItem;
  setCheck: boolean[];
};

export type PerformList = {
  lastModified: Date | null;
  completed: boolean;
  list: PerformItem[];
};

const initialState: PerformList = {
  lastModified: null,
  completed: false,
  list: [],
};

export const performSlice = createSlice({
  name: 'performs',
  initialState,
  reducers: {
    initialPerform: (
      state,
      {
        payload: { lastModified, exerciseList },
      }: { payload: { lastModified: Date; exerciseList: ExerciseItem[] } },
    ) => {
      state.lastModified = lastModified;
      // eslint-disable-next-line no-param-reassign
      state.list = exerciseList.map((r) => ({
        exercise: r,
        setCheck: [...Array(r.numberOfSets)].map(() => false),
      }));
    },
    toggleCheck: (
      state,
      { payload: { name, idx } }: { payload: { name: string; idx: number } },
    ) => {
      const exer = state.list.find((l) => l.exercise.exercise.name === name);
      if (!exer) return;

      if (!exer.setCheck[idx] && (idx === 0 || exer.setCheck[idx - 1]))
        exer.setCheck[idx] = !exer.setCheck[idx];
      else if (
        exer.setCheck[idx] &&
        (idx === exer.setCheck.length - 1 || !exer.setCheck[idx + 1])
      )
        exer.setCheck[idx] = !exer.setCheck[idx];
    },
  },
});

export const { initialPerform, toggleCheck } = performSlice.actions;

export default performSlice.reducer;
