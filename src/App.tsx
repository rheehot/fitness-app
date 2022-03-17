import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from 'pages/Home';
import RoutinePage from 'pages/Routine';
import RecordPage from 'pages/Record';
import styled from '@emotion/styled';
import { css, Global, ThemeProvider, useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'modules/hooks';
import { globalStyles } from './lib/globalStyles';

const AppBlock = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  @media (min-width: 430px) {
    padding: 1rem;
  }
`;

const GlobalStyles = () => {
  const theme = useTheme();
  return (
    <Global
      styles={css`
        ${globalStyles};
        body {
          background: ${theme.body};
          color: ${theme.letter_main};
          touch-action: pan-y;
        }
        input,
        textArea,
        button {
          color: ${theme.letter_main};
          background: ${theme.background_sub};
        }
      `}
    />
  );
};

function App() {
  const theme = useSelector(themeSelector);
  return (
    <AppBlock>
      <ThemeProvider theme={theme.colors}>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/routine" element={<RoutinePage />} />
          <Route path="/record" element={<RecordPage />} />
        </Routes>
      </ThemeProvider>
    </AppBlock>
  );
}

export default App;
