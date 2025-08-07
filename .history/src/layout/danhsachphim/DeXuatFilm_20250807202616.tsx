import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PhimModel from "../../model/PhimModel";
import { PhimAPI } from "../../api/PhimAPI";
import PhimCard from "./Props/PhimCard";

interface DeXuatFilmProps {
  currentPhimId: number;
  slidesToShow?: number;
  title?: string;
}

const DeXuatFilm: React.FC<DeXuatFilmProps> = ({
  currentPhimId,
  slidesToShow = 4,
  title = "Phim Đề Xuất",
}) => {
  const [danhSachPhim, setDanhSachPhim] = useState<PhimModel[]>([]);

  useEffect(() => {
    const fetchPhim = async () => {
      try {
        const response = await PhimAPI.getTopThinhHanh(20);
        const filtered = response.filter((phim) => phim.idPhim !== currentPhimId);
        setDanhSachPhim(filtered);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phim đề xuất:", error);
      }
    };

    fetchPhim();
  }, [currentPhimId]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: slidesToShow,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, slidesToShow),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container my-4">
      <h5 className="mb-3 text-warning">{title}</h5>
      <Slider {...settings}>
        {danhSachPhim.map((phim) => (
          <div key={phim.idPhim} className="p-2">
            <PhimCard phim={phim} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DeXuatFilm;
