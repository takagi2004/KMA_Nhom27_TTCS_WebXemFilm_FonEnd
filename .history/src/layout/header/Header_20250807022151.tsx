import React from "react";
import DanhSachPhim from "../danhsachphim/DanhSachPhim";
import { PhimAPI } from "../../api/PhimAPI";
import Navbar from "./foode-narbar-carosel/Narbar";
import Carousel from "./foode-narbar-carosel/Carousel";
import "../../App.css"; // CSS chính
import DanhSachTheLoai from "../danhsachphim/DanhSachTheloai";

const Header: React.FC = () => {
  return (
    <div className="header-wrapper">
      {/* NAVBAR */}
      <Navbar />

      {/* CAROUSEL */}
      <div className="header-carousel">
        <Carousel />
      </div>

      {/* DANH SÁCH PHIM */}
      <main className="container-fluid header-main pb-5">
        {/* PHIM NỔI BẬT */}
        <DanhSachPhim
          title="Phim Nổi Bật"
          fetchApi={() => PhimAPI.getPhimNoiBat(30)}
        />

        {/* DANH SÁCH THỂ LOẠI */}
        <DanhSachTheLoai slidesToShow={8} />  {/* ✅ Thêm ở đây */}

        {/* PHIM MỚI NHẤT */}
        <DanhSachPhim
          title="Phim Mới Nhất"
          fetchApi={() => PhimAPI.getPhimMoiNhat(20)}
        />
      </main>
    </div>
  );
};

export default Header;
