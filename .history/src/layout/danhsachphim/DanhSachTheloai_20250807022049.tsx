import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { TheLoaiAPI } from "../../api/TheLoaiAPI";
import { TheLoaiModel } from "../../model/TheLoaiModel";
import PhimCard from "../danhsachphim/Props/PhimCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface DanhSachTheLoaiProps {
  slidesToShow?: number;
}

const DanhSachTheLoai: React.FC<DanhSachTheLoaiProps> = ({ slidesToShow = 8 }) => {
  const [theLoaiList, setTheLoaiList] = useState<TheLoaiModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    TheLoaiAPI.getAllTheLoaiWithPhim()
      .then((data) => {
        setTheLoaiList(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải danh sách thể loại");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-light p-4">Đang tải thể loại...</div>;
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
    <div className="danh-sach-the-loai-wrapper">
      {theLoaiList.map((theLoai) => (
        <div key={theLoai.idTheLoai} className="mb-5">
          <h3 className="mb-4 text-light fw-bold ps-4 text-start">
            {theLoai.tenTheLoai}
          </h3>
          {theLoai.phimList && theLoai.phimList.length > 0 ? (
            <div className="px-4">
              <Slider {...settings}>
                {theLoai.phimList.map((phim) => (
                  <div key={phim.idPhim} className="px-2">
                    <PhimCard phim={phim} />
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <div className="text-light ps-4">Chưa có phim nào.</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DanhSachTheLoai;
