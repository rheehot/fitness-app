import { createSlice } from '@reduxjs/toolkit';

type Theme = {
  mode: 'light' | 'dark';
  colors: {
    [x: string]: string;
  };
};

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    body: '#f5f5f5',
    background_base: 'white',
    background_main: '#cccccc',
    background_sub: '#eeeeee',
    letter_main: 'black',
    letter_sub: '#5a5d5f',
    highlight_main: '#00ffb3',
    highlight_sub: '#dcfff5',
    memo_body: '#fffed5',
    red: '#df2323',
    yellow: '#ffd900',
    blue: '#1d2adb',
  },
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    body: '#111111',
    background_base: 'black',
    background_main: '#999999',
    background_sub: '#444444',
    letter_main: '#eeeeee',
    letter_sub: '#aaaaaa',
    highlight_main: '#33a07f',
    highlight_sub: '#466159',
    memo_body: '#171f41',
    red: '#e44d4d',
    yellow: '#a77a00',
    blue: '#41c7df',
  },
};

const initialState = lightTheme;

export const themeSlice = createSlice({
  name: 'themes',
  initialState,
  reducers: {
    toggleTheme: (state) => (state.mode === 'light' ? darkTheme : lightTheme),
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
