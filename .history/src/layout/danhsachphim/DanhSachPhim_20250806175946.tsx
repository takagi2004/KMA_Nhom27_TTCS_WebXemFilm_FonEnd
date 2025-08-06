import React, { useEffect, useState } from "react";
import PhimModel from "../../model/PhimModel";
import { PhimAPI } from "../../api/PhimAPI";
import PhimCard from "./Props/PhimCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DanhSachPhim: React.FC = () => {
  const [phimNoiBat, setPhimNoiBat] = useState<PhimModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    PhimAPI.getPhimNoiBat(30) // Lấy nhiều phim hơn để có thể lướt
      .then((data) => {
        setPhimNoiBat(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải phim nổi bật");
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="text-light p-4">Đang tải danh sách phim nổi bật...</div>;
  if (error) return <div className="text-danger p-4">{error}</div>;

  // Cấu hình slider
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 8,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200, // Tablet lớn
        settings: { slidesToShow: 4, slidesToScroll: 4 },
      },
      {
        breakpoint: 768, // Mobile
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
    ],
  };

  return (
    <div className="danh-sach-phim-wrapper">
      <div className="danh-sach-phim-container">
        <h3 className="mb-4 text-light fw-bold ps-4 text-start">Phim Nổi Bật</h3>
        <div className="px-4">
          <Slider {...settings}>
            {phimNoiBat.map((phim) => (
              <div key={phim.idPhim} className="px-2">
                <PhimCard phim={phim} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default DanhSachPhim;
