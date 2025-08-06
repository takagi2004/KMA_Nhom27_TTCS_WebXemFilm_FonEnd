import React from "react";
import Navbar from "./foode-narbar-carosel/Narbar";
import Carousel from "./foode-narbar-carosel/Carousel";
import DanhSachPhim from "../danhsachphim/DanhSachPhim";
import { PhimAPI } from "../../api/PhimAPI";
import BannerMid from "../../anh/banne.jpg";

const Header: React.FC = () => {
  return (
    <div className="bg-dark">
      {/* NAVBAR */}
      <Navbar />

      {/* CAROUSEL */}
      <div className="mt-2 mb-4">
        <Carousel />
      </div>

      {/* MAIN CONTENT */}
      <main className="container-fluid d-flex flex-column pb-5">

        {/* Danh sách 1 */}
        <section className="mb-4">
          <DanhSachPhim
            title="Phim Nổi Bật"
            fetchApi={() => PhimAPI.getPhimNoiBat(30)}
          />
        </section>

        {/* Banner giữa */}
        <section className="text-center my-4">
          <img
            src={BannerMid}
            alt="Banner giữa danh sách phim"
            className="banner-mid img-fluid shadow"
          />
        </section>

        {/* Danh sách 2 */}
        <section className="mt-4">
          <DanhSachPhim
            title="Phim Mới Nhất"
            fetchApi={() => PhimAPI.getPhimMoiNhat(20)}
          />
        </section>
      </main>
    </div>
  );
};

export default Header;
