import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ChiTietPhim: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [phim, setPhim] = useState<PhimModel | null>(null);

  useEffect(() => {
    if (id) {
      PhimAPI.getPhimById(Number(id)).then(setPhim);
    }
  }, [id]);

  if (!phim) return <div className="text-light text-center mt-5">Đang tải...</div>;

  return (
    <div className="container text-light mt-5 pt-5">
      <h2>{phim.tenPhim}</h2>
      <img
        src={phim.anhBia || "https://via.placeholder.com/400x600"}
        alt={phim.tenPhim}
        className="img-fluid mb-3"
        style={{ maxHeight: "400px" }}
      />
      <p>{phim.moTa}</p>

      {/* Demo: nút xem phim */}
      <button className="btn btn-warning mt-3">Xem phim</button>
    </div>
  );
};

export default ChiTietPhim;
