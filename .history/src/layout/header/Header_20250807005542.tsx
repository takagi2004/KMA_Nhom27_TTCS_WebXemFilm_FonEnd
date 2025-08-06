import React from "react";
import Navbar from "./foode-narbar-carosel/Narbar";
import Carousel from "./foode-narbar-carosel/Carousel";
import DanhSachPhim from "../danhsachphim/DanhSachPhim";
import { PhimAPI } from "../../api/PhimAPI";

const Header: React.FC = () => {
  return (
    <header className="bg-dark">
      {/* Thanh navbar */}
      <Navbar />

      {/* Carousel có khoảng cách dưới */}
      <div className="mt-2 mb-9">
        <Carousel />
      </div>
      {/* ✅ Ảnh banner giữa Carousel và Danh Sách Phim */}
      <div className="container-fluid my-4">
        <img
          src={BannerMid}
          alt="Banner giữa"
          className="img-fluid rounded shadow"
        />
      </div>

      {/* Các danh sách phim */}
      <div className="container-fluid d-flex flex-column gap-5 pb-5">
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
