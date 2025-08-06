import React from "react";
import DanhSachPhim from "../danhsachphim/DanhSachPhim";
import { PhimAPI } from "../../api/PhimAPI";
import Navbar from "./foode-narbar-carosel/Narbar";
import Carousel from "./foode-narbar-carosel/Carousel";
import "./Header.css"; // chứa style tổng thể

const Header: React.FC = () => {
  return (
    <div className="bg-dark header-wrapper">
      {/* NAVBAR */}
      <Navbar />

      {/* CAROUSEL */}
      <div className="header-carousel">
        <Carousel />
      </div>

      {/* DANH SÁCH PHIM */}
      <main className="container-fluid header-main pb-5">
        <DanhSachPhim
          title="Phim Nổi Bật"
          fetchApi={() => PhimAPI.getPhimNoiBat(30)}
        />
        <DanhSachPhim
          title="Phim Mới Nhất"
          fetchApi={() => PhimAPI.getPhimMoiNhat(20)}
        />
      </main>
    </div>
  );
};

export default Header;
