import React from "react";
import Navbar from "./foode-narbar-carosel/Narbar";
import Carousel from "./foode-narbar-carosel/Carousel";
import DanhSachPhim from "../danhsachphim/DanhSachPhim";
import { PhimAPI } from "../../api/PhimAPI";
import BannerMid from "../../anh/banne.jpg";

const Header: React.FC = () => {
  return (
    <div className="bg-dark">
      {/* ================== NAVBAR ================== */}
      <Navbar />

      {/* ================== CAROUSEL ================== */}
      <div className="mt-2 mb-5">
        <Carousel />
      </div>

      {/* ================== BANNER GIỮA ================== */}
      <div className="w-100 my-4">
        <img
          src={BannerMid}
          alt="Banner giữa"
          className="img-fluid w-100"
          style={{ maxHeight: "250px", objectFit: "cover" }}
        />
      </div>

      {/* ================== DANH SÁCH PHIM ================== */}
      <main className="container-fluid d-flex flex-column gap-5 pb-5">
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
