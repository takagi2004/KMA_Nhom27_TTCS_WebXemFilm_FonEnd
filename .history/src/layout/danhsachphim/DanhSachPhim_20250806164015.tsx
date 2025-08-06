import React, { useEffect, useState } from "react";
import PhimModel from "../../model/PhimModel";
import { PhimAPI } from "../../api/PhimAPI";
import PhimCard from "./Props/PhimProps";

const DanhSachPhim: React.FC = () => {
  const [phimNoiBat, setPhimNoiBat] = useState<PhimModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    PhimAPI.getPhimNoiBat(8)
      .then((data) => {
        setPhimNoiBat(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Không thể tải phim nổi bật");
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="text-light p-4">Đang tải danh sách phim nổi bật...</div>;
  if (error) return <div className="text-danger p-4">{error}</div>;

  return (
    <div className="danh-sach-phim-container">
      <h3 className="mb-4 text-light fw-bold ps-4 text-start">Phim Nổi Bật</h3>
      <div className="container">
        <div className="d-flex flex-wrap">
          {phimNoiBat.map((phim) => (
            <PhimCard key={phim.idPhim} phim={phim} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DanhSachPhim;
