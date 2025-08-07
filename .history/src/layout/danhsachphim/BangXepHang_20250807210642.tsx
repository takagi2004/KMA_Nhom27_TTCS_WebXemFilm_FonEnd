import React, { useEffect, useState } from "react";
import PhimModel from "../../model/PhimModel";
import { PhimAPI } from "../../api/PhimAPI";
import { Link } from "react-router-dom";

const BangXepHang: React.FC = () => {
  const [topPhim, setTopPhim] = useState<PhimModel[]>([]);

  useEffect(() => {
    const fetchTopPhim = async () => {
      try {
        const data = await PhimAPI.getTopThinhHanh(10); // lấy top 10
        setTopPhim(data);
      } catch (error) {
        console.error("Lỗi khi lấy bảng xếp hạng phim:", error);
      }
    };

    fetchTopPhim();
  }, []);

  return (
    <div className="bg-dark p-3 rounded border border-secondary mt-4">
      <h5 className="text-warning mb-3">🔥 Bảng xếp hạng phim</h5>
      <ol className="list-group list-group-numbered bg-dark">
        {topPhim.map((phim, index) => (
          <li
            key={phim.idPhim}
            className="list-group-item bg-dark text-light border-0 px-0 py-2 d-flex justify-content-between align-items-center"
          >
            <Link to={`/phim/${phim.idPhim}`} className="text-decoration-none text-light">
              {phim.tenPhim}
            </Link>
            <span className="badge bg-warning text-dark">{index + 1}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default BangXepHang;
