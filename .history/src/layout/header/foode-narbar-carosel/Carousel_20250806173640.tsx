import React, { useEffect, useState } from "react";
import "../../../App.css";
import { PhimAPI } from "../../../api/PhimAPI";
import PhimModel from "../../../model/PhimModel";

const Carousel: React.FC = () => {
  const [phimNoiBat, setPhimNoiBat] = useState<PhimModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    PhimAPI.getPhimNoiBat(5)
      .then((data) => {
        setPhimNoiBat(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Không thể tải phim nổi bật");
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-light p-4">Đang tải phim nổi bật...</div>;
  if (error) return <div className="text-danger p-4">{error}</div>;

  return (
    <div id="movieCarousel" className="carousel slide carousel-fade carousel-container" data-bs-ride="carousel">
      <div className="carousel-inner">
        {phimNoiBat.map((phim, index) => {
          const thoiLuong = phim.tapPhim?.length
            ? `${phim.tapPhim[0].thoiLuong} phút`
            : "Chưa có";

          return (
            <div key={phim.idPhim} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img
                src={phim.anhBia || "https://via.placeholder.com/1920x1080?text=No+Image"}
                className="d-block w-100 carousel-img"
                alt={phim.tenPhim}
              />

              {/* Overlay cho desktop */}
              <div className="carousel-overlay-bottom-left d-none d-sm-block">
                <h2 className="fw-bold display-5">{phim.tenPhim}</h2>

                <div className="mb-2">
                  <span className="badge bg-success me-2">Top Thịnh Hành</span>
                  {phim.goiDangKy?.map((goi, i) => (
                    <span key={i} className="badge bg-info me-2">{goi}</span>
                  ))}
                </div>

                <p className="mb-1">
                  <span className="text-warning fw-bold me-2">
                    ★ {phim.diemTrungBinh?.toFixed(1) || 0}
                  </span>
                  {phim.namPhatHanh} | {phim.soLuong || 0} tập | {thoiLuong}
                </p>

                <p className="mb-2 text-light small">
                  {phim.theLoai?.join(" • ")} {phim.quocGia && `• ${phim.quocGia}`}
                </p>

                <p className="text-light" style={{ maxWidth: "600px" }}>
                  {phim.moTa?.length && phim.moTa.length > 200
                    ? phim.moTa.substring(0, 200) + "..."
                    : phim.moTa}
                </p>

                <div className="mt-3">
                  <button className="btn btn-success me-2">▶ Xem ngay</button>
                  <button className="btn btn-outline-light">+ Thêm vào danh sách</button>
                </div>
              </div>

              {/* Info mobile */}
              <div className="carousel-mobile-info d-sm-none">
                <h2>{phim.tenPhim}</h2>
                <span className="badge bg-success">Top Thịnh Hành</span>
                {phim.goiDangKy?.map((goi, i) => (
                  <span key={i} className="badge bg-info">{goi}</span>
                ))}

                <span className="rating">★ {phim.diemTrungBinh?.toFixed(1) || 0}</span>
                <div className="meta">
                  {phim.namPhatHanh} | {phim.soLuong || 0} tập | {thoiLuong}
                </div>

                <div className="mt-2">
                  <button className="btn btn-success me-2">▶ Xem ngay</button>
                  <button className="btn btn-outline-light">+ Thêm vào danh sách</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#movieCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#movieCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
};

export default Carousel;
