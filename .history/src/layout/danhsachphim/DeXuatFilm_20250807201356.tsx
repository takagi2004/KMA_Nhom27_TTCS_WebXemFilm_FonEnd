// src/components/DeXuatFilm.tsx
import React, { useEffect, useState } from "react";
import PhimModel from "../../model/PhimModel";
import PhimCard from "./Props/PhimCard";
import { PhimAPI } from "../../api/PhimAPI";

interface DeXuatFilmProps {
  currentPhimId: number;
}

const DeXuatFilm: React.FC<DeXuatFilmProps> = ({ currentPhimId }) => {
  const [danhSachDeXuat, setDanhSachDeXuat] = useState<PhimModel[]>([]);
  const [soLuongHienThi, setSoLuongHienThi] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      const data = await PhimAPI.getTatCaPhim();
      const locDeXuat = data.filter((p) => p.id !== currentPhimId);
      setDanhSachDeXuat(locDeXuat);
    };
    fetchData();
  }, [currentPhimId]);

  const phimHienThi = danhSachDeXuat.slice(0, soLuongHienThi);
  const conThem = danhSachDeXuat.length > soLuongHienThi;

  return (
    <div className="mt-4">
      <h5 className="fw-bold mb-2">Phim đề xuất</h5>
      <div
        className="d-flex flex-wrap gap-3 overflow-auto"
        style={{ maxHeight: "400px", paddingRight: "10px" }}
      >
        {phimHienThi.map((phim) => (
          <PhimCard key={phim.id} phim={phim} className="flex-grow-1" />
        ))}
      </div>

      {/* Nút "Xem thêm" trên thiết bị nhỏ */}
      <div className="mt-2 d-md-none text-center">
        {conThem && (
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => setSoLuongHienThi((prev) => prev + 6)}
          >
            Xem thêm
          </button>
        )}
      </div>
    </div>
  );
};

export default DeXuatFilm;
