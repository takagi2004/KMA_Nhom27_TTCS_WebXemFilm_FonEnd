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
      <div className="mt-2 mb-4">
        <Carousel />
      </div>

      {/* ================== DANH SÁCH PHIM ================== */}
      <main className="container-fluid d-flex flex-column gap-4 pb-5">
        {/* Danh sách 1 */}
        <DanhSachPhim
          title="Phim Nổi Bật"
          fetchApi={() => PhimAPI.getPhimNoiBat(30)}
        />

        {/* ✅ Banner giữa hai danh sách phim */}
        <div className="d-flex justify-content-center">
          <img
            src={BannerMid}
            alt="Banner giữa danh sách phim"
            className="img-fluid rounded shadow"
            style={{
              maxHeight: "220px",
              width: "100%",
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
        </div>

        {/* Danh sách 2 */}
        <DanhSachPhim
          title="Phim Mới Nhất"
          fetchApi={() => PhimAPI.getPhimMoiNhat(20)}
        />
      </main>
    </div>
  );
};

export default Header;
