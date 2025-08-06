import React from "react";
import Navbar from "./foode-narbar-carosel/Narbar";
import Carousel from "./foode-narbar-carosel/Carousel";
import DanhSachPhim from "../danhsachphim/DanhSachPhim";

const Header: React.FC = () => {
  return (
    <header>
      <Navbar />
      <Carousel />

      {/* Danh sách phim trồi lên nhẹ */}
      <div className="danh-sach-phim-wrapper">
        <DanhSachPhim />
      </div>
    </header>
  );
};

export default Header;
