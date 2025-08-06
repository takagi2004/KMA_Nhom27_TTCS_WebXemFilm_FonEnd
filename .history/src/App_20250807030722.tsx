import React from 'react';
import Hompage from './layout/Hompage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DanhSachChiTietTheLoai from './layout/danhsachphim/danhsachtheloai/DanhSachChiTietTheLoai';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Hompage />} />
            <Route path="/the-loai/:idTheLoai" element={<DanhSachChiTietTheLoai />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
