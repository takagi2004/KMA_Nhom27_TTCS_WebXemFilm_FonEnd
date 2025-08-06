import React from 'react';
import './App.css';
import Hompage from './layout/Hompage';
import { Route, Router, Routes } from 'react-router-dom';
import ChiTietTheLoai from './layout/danhsachphim/danhsachtheloai/DanhSachChiTietTheLoai';

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
