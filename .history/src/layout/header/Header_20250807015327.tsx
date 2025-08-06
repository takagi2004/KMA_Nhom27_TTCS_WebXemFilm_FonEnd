import React from "react";
import DanhSachPhim from "../danhsachphim/DanhSachPhim";
import { PhimAPI } from "../../api/PhimAPI";
import BannerMid from "../../anh/banne.jpg";
import Navbar from "./foode-narbar-carosel/Narbar";
import Carousel from "./foode-narbar-carosel/Carousel";

const Header: React.FC = () => {
  return (
    <div className="bg-dark">
      {/* NAVBAR */}
      <Navbar />

      {/* CAROUSEL */}
      <div className="mt-2 mb-4">
        <Carousel />
      </div>

      {/* DANH SÁCH PHIM */}
      <main className="container-fluid d-flex flex-column gap-4 pb-5">
        <DanhSachPhim
          title="Phim Nổi Bật"
          fetchApi={() => PhimAPI.getPhimNoiBat(30)}
        />

        {/* Banner giữa
        <div className="banner-mid my-4">
          <img
            src={BannerMid}
            alt="Sự kiện đặc biệt"
            className="img-fluid w-100"
          />
        </div> */}

        <DanhSachPhim
          title="Phim Mới Nhất"
          fetchApi={() => PhimAPI.getPhimMoiNhat(20)}
        />
      </main>
    </div>
  );
};

export default Header;
