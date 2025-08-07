import React, { useEffect, useState } from "react";
import PhimModel from "../../model/PhimModel";
import { PhimAPI } from "../../api/PhimAPI";
import PhimCard from "./Props/PhimCard";

interface DeXuatFilmProps {
  currentPhimId: number;
  title?: string;
}

const DeXuatFilm: React.FC<DeXuatFilmProps> = ({
  currentPhimId,
  title = "Phim đề xuất",
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

  return (
    <div className="bg-dark p-3 rounded border border-secondary">
      <h5 className="text-warning mb-3">{title}</h5>
      <div
        className="d-flex overflow-auto gap-3 pb-2"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {danhSachPhim.map((phim) => (
          <div key={phim.idPhim} style={{ minWidth: "160px", scrollSnapAlign: "start" }}>
            <PhimCard phim={phim} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeXuatFilm;
