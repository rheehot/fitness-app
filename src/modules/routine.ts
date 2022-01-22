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

export type ExerciseList = ExerciseItem[]; // 하루 루틴

export type Routine = {
  id: string;
  title: string;
  weekRoutine: [
    ExerciseList | [],
    ExerciseList | [],
    ExerciseList | [],
    ExerciseList | [],
    ExerciseList | [],
    ExerciseList | [],
    ExerciseList | [],
  ];
}; // 일주일 루틴

export type RoutineStateType = Routine[]; // 루틴 목록

const initialState: RoutineStateType = [
  {
    id: '0',
    title: '테스트',
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
    },
  },
});

export const { changeTitle, addRoutine, removeRoutine, addExercise } =
  routineSlice.actions;

export default routineSlice.reducer;
