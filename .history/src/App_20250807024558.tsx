import React from 'react';
import './App.css';
import Hompage from './layout/Hompage';
import { Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Hompage />} />
          <Route path="/the-loai/:idTheLoai" element={<ChiTietTheLoai />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
