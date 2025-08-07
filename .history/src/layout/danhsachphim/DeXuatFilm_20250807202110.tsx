import React, { useEffect, useState } from "react";
import PhimModel from "../../../model/PhimModel";
import { PhimAPI } from "../../../api/PhimAPI";
import PhimCard from "../Props/PhimCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface DeXuatFilmProps {
  currentPhimId?: number; // nếu muốn loại bỏ phim đang xem
  slidesToShow?: number;
  title?: string;
}

const DeXuatFilm: React.FC<DeXuatFilmProps> = ({
  currentPhimId,
  slidesToShow = 4,
  title = "Phim đề xuất",
}) => {
  const [danhSachPhim, setDanhSachPhim] = useState<PhimModel[]>([]);

  useEffect(() => {
    const fetchPhim = async () => {
      try {
        const response = await PhimAPI.getAllPhim();
        const locPhim = currentPhimId
          ? response.filter((phim) => phim.idPhim !== currentPhimId)
          : response;
        setDanhSachPhim(locPhim);
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
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: Math.min(4, slidesToShow),
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="danh-sach-phim-wrapper">
      <div className="danh-sach-phim-container">
        <h3 className="mb-4 text-light fw-bold ps-4 text-start">{title}</h3>
        <div className="px-4">
          <Slider {...settings}>
            {danhSachPhim.map((phim) => (
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

export default DeXuatFilm;
