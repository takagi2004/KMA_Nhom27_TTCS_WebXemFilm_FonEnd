import React, { useEffect, useState } from "react";
import { PhimAPI } from "../../../api/PhimAPI";
import PhimModel from "../../../model/PhimModel";
import PhimCard from "./PhimCard";

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

  if (loading) return <div className="text-light p-4">Đang tải danh sách phim nổi bật...</div>;
  if (error) return <div className="text-danger p-4">{error}</div>;

  return (
    <div className="py-5" style={{ backgroundColor: "#1c1c1c" }}>
      <div className="container">
        <h3 className="mb-4 text-light fw-bold">🎬 Phim Nổi Bật</h3>
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
