import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import Routine from 'pages/Routine';
import Record from 'pages/Record';
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
        <Route path="/" element={<Home />} />
        <Route path="/routine" element={<Routine />} />
        <Route path="/record" element={<Record />} />
      </Routes>
    </AppBlock>
  );
}

export default App;
