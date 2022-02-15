import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from 'pages/Home';
import RoutinePage from 'pages/Routine';
import RecordPage from 'pages/Record';
import styled from '@emotion/styled';

const AppBlock = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

function App() {
  return (
    <AppBlock>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/routine" element={<RoutinePage />} />
        <Route path="/record" element={<RecordPage />} />
      </Routes>
    </AppBlock>
  );
}

export default App;
