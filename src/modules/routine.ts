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
  id: number;
  title: string;
  routine: [
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
    id: 0,
    title: '테스트',
    routine: [
      [],
      [
        {
          exercise: {
            name: '랫 풀 다운',
            category: '상체',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '시티드 로우',
            category: '상체',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '암 컬',
            category: '상체',
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
            category: '상체',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: '상체',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: '상체',
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
            category: '상체',
            part: ['가슴'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: '상체',
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
            category: '상체',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '시티드 로우',
            category: '상체',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '암 컬',
            category: '상체',
            part: ['이두'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: '상체',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: '상체',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: '상체',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: '상체',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: '상체',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: '상체',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: '상체',
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
    id: 1,
    title: '1번',
    routine: [
      [],
      [
        {
          exercise: {
            name: '시티드 로우',
            category: '상체',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '암 컬',
            category: '상체',
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
            category: '상체',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: '상체',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: '상체',
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
            category: '상체',
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
            category: '상체',
            part: ['가슴'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: '상체',
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
            category: '상체',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '시티드 로우',
            category: '상체',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '암 컬',
            category: '상체',
            part: ['이두'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: '상체',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: '상체',
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
            category: '상체',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: '상체',
            part: ['등'],
          },
          weight: 40,
          numberOfTimes: 12,
          numberOfSets: 5,
        },
        {
          exercise: {
            name: '랫 풀 다운',
            category: '상체',
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
    addRoutine: (state, { payload }: { payload: Routine }) => {
      state.push(payload);
    },
    removeRoutine: (state, { payload }: { payload: number }) => {
      const filtered = state.filter((routine) => routine.id !== payload);
      return filtered;
    },
  },
});

export const { addRoutine, removeRoutine } = routineSlice.actions;

export default routineSlice.reducer;
