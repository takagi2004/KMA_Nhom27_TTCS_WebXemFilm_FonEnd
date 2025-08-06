import React from "react";
import Navbar from "./foode-narbar-carosel/Narbar";
import Carousel from "./foode-narbar-carosel/Carousel";
import DanhSachPhim from "../danhsachphim/DanhSachPhim";

const Header: React.FC = () => {
  return (
    <header className="carousel-container">
      <Navbar />
      <Carousel />

      {/* Gradient mờ phía dưới Carousel */}
      <div className="carousel-bottom-fade"></div>

      {/* Danh sách phim đè lên một chút */}
      <div className="danh-sach-phim-wrapper">
        <DanhSachPhim />
      </div>
    </header>
  );
};

export default Header;
