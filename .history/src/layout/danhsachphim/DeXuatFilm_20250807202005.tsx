import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PhimModel from "../../model/PhimModel";
import { PhimAPI } from "../../api/PhimAPI";

const DeXuatFilm: React.FC = () => {
  const [danhSachPhim, setDanhSachPhim] = useState<PhimModel[]>([]);

  useEffect(() => {
    const fetchPhim = async () => {
      try {
        const response = await PhimAPI.getAllPhim();
        setDanhSachPhim(response);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phim đề xuất:", error);
      }
    };

    fetchPhim();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
    <div className="container my-5">
      <h2 className="mb-4 text-center">Phim Đề Xuất</h2>
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
