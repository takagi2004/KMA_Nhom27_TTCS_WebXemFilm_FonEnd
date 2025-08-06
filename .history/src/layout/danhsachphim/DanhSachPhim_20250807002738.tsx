import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import PhimModel from "../../model/PhimModel";
import PhimCard from "./Props/PhimCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface DanhSachPhimProps {
  title: string;
  fetchApi: () => Promise<PhimModel[]>;
  slidesToShow?: number;
}

const DanhSachPhim: React.FC<DanhSachPhimProps> = ({ title, fetchApi, slidesToShow = 8 }) => {
  const [phimList, setPhimList] = useState<PhimModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi()
      .then((data) => {
        setPhimList(data);
        setLoading(false);
      })
      .catch(() => {
        setError(`Không thể tải ${title}`);
        setLoading(false);
      });
  }, [fetchApi, title]);

  if (loading) return <div className="text-light p-4">Đang tải {title}...</div>;
  if (error) return <div className="text-danger p-4">{error}</div>;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: slidesToShow,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: Math.min(4, slidesToShow), slidesToScroll: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
    ],
  };

  return (
    <div className="danh-sach-phim-wrapper">
      <div className="danh-sach-phim-container">
        <h3 className="mb-4 text-light fw-bold ps-4 text-start">{title}</h3>
        <div className="px-4">
          <Slider {...settings}>
            {phimList.map((phim) => (
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
