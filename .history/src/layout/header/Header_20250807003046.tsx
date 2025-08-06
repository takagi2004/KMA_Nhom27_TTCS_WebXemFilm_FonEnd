import React from "react";
import Navbar from "./foode-narbar-carosel/Narbar";
import Carousel from "./foode-narbar-carosel/Carousel";
import DanhSachPhim from "../danhsachphim/DanhSachPhim";
import { PhimAPI } from "../../api/PhimAPI";

const Header: React.FC = () => {
  return (
    <header>
      <Navbar />
      <Carousel />

      {/* Danh sách phim trồi lên nhẹ */}
      <div className="danh-sach-phim-wrapper d-flex flex-column gap-5">
        <DanhSachPhim
          title="Phim Nổi Bật"
          fetchApi={() => PhimAPI.getPhimNoiBat(30)}
        />
        <DanhSachPhim
          title="Phim Mới Nhất"
          fetchApi={() => PhimAPI.getPhimMoiNhat(20)}
        />
      </div>

    </header>
  );
};

export default Header;
