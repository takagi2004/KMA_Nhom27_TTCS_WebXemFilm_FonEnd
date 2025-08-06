import React from "react";
import "./Carousel.css";

const Carousel: React.FC = () => {
  return (
    <div
      id="introCarousel"
      className="carousel slide carousel-fade shadow-2-strong"
      data-mdb-ride="carousel"
    >
      {/* Chấm chỉ số */}
      <div className="carousel-indicators">
        <button data-mdb-target="#introCarousel" data-mdb-slide-to="0" className="active"></button>
        <button data-mdb-target="#introCarousel" data-mdb-slide-to="1"></button>
        <button data-mdb-target="#introCarousel" data-mdb-slide-to="2"></button>
      </div>

      {/* Nội dung slide */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="text-white text-center">
                <h1 className="mb-3">Học Bootstrap 5 với MDB</h1>
                <h5 className="mb-4">Thiết kế web responsive miễn phí</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="carousel-item">
          <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="text-white text-center">
                <h2>Bạn có thể đặt bất kỳ nội dung gì ở đây</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nút điều hướng */}
      <a className="carousel-control-prev" href="#introCarousel" role="button" data-mdb-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </a>
      <a className="carousel-control-next" href="#introCarousel" role="button" data-mdb-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </a>
    </div>
  );
};

export default Carousel;
