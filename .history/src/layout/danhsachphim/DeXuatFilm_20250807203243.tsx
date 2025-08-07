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
  title = "Phim Đề Xuất",
}) => {
  const [danhSachPhim, setDanhSachPhim] = useState<PhimModel[]>([]);
  const [xemThem, setXemThem] = useState(false);

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

  const danhSachHienThi = xemThem ? danhSachPhim : danhSachPhim.slice(0, 5);

  return (
    <div className="bg-dark p-3 rounded border border-secondary">
      <h5 className="text-warning mb-3">{title}</h5>
      <div
        className="overflow-auto"
        style={{ maxHeight: "70vh", paddingRight: "6px" }}
      >
        {danhSachHienThi.map((phim) => (
          <div key={phim.idPhim} className="mb-3">
            <PhimCard phim={phim} />
          </div>
        ))}
      </div>

      {/* Chỉ hiện xem thêm khi ở mobile */}
      {!xemThem && danhSachPhim.length > 5 && (
        <div className="mt-2 d-block d-md-none text-end">
          <button
            className="btn btn-link text-warning p-0"
            onClick={() => setXemThem(true)}
          >
            Xem thêm ▼
          </button>
        </div>
      )}
    </div>
  );
};

export default DeXuatFilm;
