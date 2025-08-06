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

  if (loading) return <div>Đang tải phim nổi bật...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      id="movieCarousel"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {phimNoiBat.map((phim, index) => (
          <div
            key={phim.idPhim}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            {/* Ảnh nền */}
            <img
              src={
                phim.anhBia ||
                "https://via.placeholder.com/1280x720?text=No+Image"
              }
              className="d-block w-100 carousel-img"
              alt={phim.tenPhim}
            />

            {/* Overlay góc trái dưới */}
            <div className="carousel-overlay-bottom-left text-start">
              <h2 className="fw-bold">{phim.tenPhim}</h2>

              {/* Badge trạng thái */}
              <div className="mb-2">
                <span className="badge bg-success me-2">Top Thịnh Hành</span>
                {phim.goiDangKy?.map((goi, i) => (
                  <span key={i} className="badge bg-info me-2">
                    {goi}
                  </span>
                ))}
              </div>

              {/* Thông tin nhanh */}
              <p className="mb-2">
                <span className="text-warning fw-bold me-2">
                  ★ {phim.diemTrungBinh?.toFixed(1) || 0}
                </span>
                {phim.namPhatHanh} | {phim.soLuong} tập
              </p>

              {/* Thể loại */}
              <p className="mb-2 text-light small">
                {phim.theLoai?.join(" • ")}
              </p>

              {/* Mô tả */}
              <p className="text-light" style={{ maxWidth: "500px" }}>
                {phim.moTa?.length && phim.moTa.length > 200
                  ? phim.moTa.substring(0, 200) + "..."
                  : phim.moTa}
              </p>

              {/* Nút hành động */}
              <div className="mt-3">
                <button className="btn btn-success me-2">▶ Xem ngay</button>
                <button className="btn btn-outline-light">
                  + Thêm vào danh sách
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nút điều hướng */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#movieCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#movieCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
};

export default Carousel;
