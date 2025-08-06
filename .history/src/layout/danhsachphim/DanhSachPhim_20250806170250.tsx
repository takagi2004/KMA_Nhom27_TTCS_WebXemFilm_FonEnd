import React, { useEffect, useState } from "react";
import PhimModel from "../../model/PhimModel";
import { PhimAPI } from "../../api/PhimAPI";
import PhimCard from "./Props/PhimProps";
import Slider from "react-slick";

const DanhSachPhim: React.FC = () => {
  const [phimNoiBat, setPhimNoiBat] = useState<PhimModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    PhimAPI.getPhimNoiBat(30)
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

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 4, slidesToScroll: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
    ],
  };

  return (
    <div className="danh-sach-phim-container">
      <h3 className="mb-4 text-light fw-bold ps-4 text-start">Phim Nổi Bật</h3>
      <div className="px-4">
        <Slider {...settings}>
          {phimNoiBat.map((phim) => (
            <div key={phim.idPhim} className="px-2">
              <PhimCard phim={phim} className="phim-card" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default DanhSachPhim;
