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
  lastModified: Date;
  weekRoutine: [
    ExerciseItem[],
    ExerciseItem[],
    ExerciseItem[],
    ExerciseItem[],
    ExerciseItem[],
    ExerciseItem[],
    ExerciseItem[],
  ];
}; // 일주일 루틴

export type RoutineStateType = Routine[]; // 루틴 목록

const initialState: RoutineStateType = [
  {
    id: '0',
    title: '테스트',
    lastModified: new Date(),
    weekRoutine: [
      [],
      [
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '시티드 로우',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '암 컬',
            category: 'upper',
            part: ['이두'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
      ],
      [
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
      ],
      [],
      [
        {
          exercise: {
            name: '체스트 프레스',
            category: 'upper',
            part: ['가슴'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
      ],
      [
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '시티드 로우',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '암 컬',
            category: 'upper',
            part: ['이두'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
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
    lastModified: new Date(),
    weekRoutine: [
      [],
      [
        {
          exercise: {
            name: '시티드 로우',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '암 컬',
            category: 'upper',
            part: ['이두'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
      ],
      [
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
      ],
      [
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
      ],
      [
        {
          exercise: {
            name: '체스트 프레스',
            category: 'upper',
            part: ['가슴'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
      ],
      [
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '시티드 로우',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '암 컬',
            category: 'upper',
            part: ['이두'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
      ],
      [
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: 'upper',
            part: ['등'],
          },
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
      r.lastModified = new Date();
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
      r.lastModified = new Date();
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
