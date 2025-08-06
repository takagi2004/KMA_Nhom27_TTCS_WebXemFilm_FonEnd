import React from "react";
import Header from "./header/Header";
import Footer from "./header/foode-narbar-carosel/Footer";
import Carousel from "./header/foode-narbar-carosel/Carousel";
import DanhSachPhim from "./danhsachphim/DanhSachPhim";
import { PhimAPI } from "../api/PhimAPI";

function Homepage() {
  return (
    <div className="App">
      <Header />

      <main className="container-fluid">
        {/* Carousel */}
        <Carousel />

        {/* Danh sách phim */}
        <DanhSachPhim
          title="Phim Nổi Bật"
          fetchApi={() => PhimAPI.getPhimNoiBat(12)}
          slidesToShow={8}
        />

        {/* Banner giữa */}
        <img
          src="https://via.placeholder.com/1200x300?text=AI+Short+Film+2025+Competition"
          alt="AI Short Film 2025 Competition"
          className="banner-mid"
        />

        <DanhSachPhim
          title="Phim Mới Nhất"
          fetchApi={() => PhimAPI.getPhimMoiNhat(12)}
          slidesToShow={8}
        />
      </main>

      <Footer />
    </div>
  );
}

export default Homepage;
