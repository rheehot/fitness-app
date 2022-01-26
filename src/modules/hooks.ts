import { RootState } from 'modules';

export const userSelector = (state: RootState) => state.user;
export const routineSelector = (state: RootState) => state.routine;
export const performSelector = (state: RootState) => state.perform;
