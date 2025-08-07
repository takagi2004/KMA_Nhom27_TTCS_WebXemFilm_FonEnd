import React, { useEffect, useState } from "react";
import PhimModel from "../../model/PhimModel";
import { PhimAPI } from "../../api/PhimAPI";
import { Link } from "react-router-dom";
import "./DeXuatFilm.css";

const DeXuatFilm: React.FC = () => {
  const [danhSachPhim, setDanhSachPhim] = useState<PhimModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PhimAPI.getAllPhim();
        setDanhSachPhim(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phim:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dexuat-container">
      <h4 className="dexuat-title">Đề xuất cho bạn</h4>
      <div className="dexuat-grid">
        {danhSachPhim.map((phim) => (
          <Link
            to={`/xem-phim/${phim.id}`}
            key={phim.id}
            className="dexuat-item"
          >
            <img
              src={phim.anh}
              alt={phim.tenPhim}
              className="dexuat-thumbnail"
            />
            <div className="dexuat-name">{phim.tenPhim}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DeXuatFilm;
