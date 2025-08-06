import React, { useEffect, useState } from "react";
import { PhimAPI } from "../../api/PhimAPI";
import PhimModel from "../../model/PhimModel";
import "../../App.css";

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
    <div id="movieCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
      <div className="carousel-inner">

        {phimNoiBat.map((phim, index) => (
          <div key={phim.idPhim} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <img
              src={phim.anhBia || "https://via.placeholder.com/1280x720?text=No+Image"}
              className="d-block w-100 carousel-img"
              alt={phim.tenPhim}
            />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
              <h3>{phim.tenPhim}</h3>
              <p>{phim.moTa?.substring(0, 150)}...</p>
            </div>
          </div>
        ))}

      </div>

      {/* Nút điều hướng */}
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
