import React from 'react';
import Hompage from './layout/Hompage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DanhSachChiTietTheLoai from './layout/danhsachphim/danhsachtheloai/DanhSachChiTietTheLoai';
import Navbar from './layout/header/foode-narbar-carosel/Narbar';
import ChiTietPhim from './layout/danhsachphim/ChiTietPhim';
import DangKyNguoiDung from './user/DangKyNguoiDung';
import DangNhap from './user/DangNhap';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Hompage />} />
            <Route path="/the-loai/:idTheLoai" element={<DanhSachChiTietTheLoai />} />
            <Route path="/phim/:id" element={<ChiTietPhim />} />
            <Route path="/dang-ky" element={<DangKyNguoiDung />} /> {/* ✅ thêm router đăng ký */}
            <Route path="/dang-nhap" element={<DangNhap />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
