import React, { useEffect, useState } from "react";
import { PhimAPI } from "../../api/PhimAPI";
import PhimModel from "../../model/PhimModel";

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

  if (loading) return <div>Đang tải danh sách phim nổi bật...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-center text-primary fw-bold">
        🎬 Phim Nổi Bật
      </h3>
      <div className="d-flex flex-wrap justify-content-center">
        {phimNoiBat.map((phim) => (
          <PhimCard key={phim.idPhim} phim={phim} />
        ))}
      </div>
    </div>
  );
};

export default DanhSachPhim;
