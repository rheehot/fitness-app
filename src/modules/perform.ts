import { createSlice } from '@reduxjs/toolkit';
import { ExerciseItem } from './routine';

export type PerformItem = {
  exercise: ExerciseItem;
  setCheck: boolean[];
};

export type PerformList = {
  lastModified: number | null;
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
      }: { payload: { lastModified: number; exerciseList: ExerciseItem[] } },
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
      {
        payload: { exerIdx, setIdx },
      }: { payload: { exerIdx: number; setIdx: number } },
    ) => {
      const exer = state.list[exerIdx];
      if (!exer) return;

      if (!exer.setCheck[setIdx] && (setIdx === 0 || exer.setCheck[setIdx - 1]))
        exer.setCheck[setIdx] = !exer.setCheck[setIdx];
      else if (
        exer.setCheck[setIdx] &&
        (setIdx === exer.setCheck.length - 1 || !exer.setCheck[setIdx + 1])
      )
        exer.setCheck[setIdx] = !exer.setCheck[setIdx];
    },
    checkAll: (
      state,
      { payload: { exerIdx } }: { payload: { exerIdx: number } },
    ) => {
      const exer = state.list[exerIdx];
      exer.setCheck = exer.setCheck.map(() => true);
    },
    completePerform: (state) => {
      state.completed = true;
      state.list = [];
    },
  },
});

export const { initialPerform, toggleCheck, checkAll, completePerform } =
  performSlice.actions;

export default performSlice.reducer;
