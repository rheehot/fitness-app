import { RootState } from 'modules';

export const userSelector = (state: RootState) => state.user;
export const routineSelector = (state: RootState) => state.routine;
