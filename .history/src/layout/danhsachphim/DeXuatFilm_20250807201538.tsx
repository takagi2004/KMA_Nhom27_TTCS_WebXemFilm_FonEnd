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
      try {
        const data = await PhimAPI.getAllPhim();
        const locDeXuat = data.filter((p) => p.idPhim !== currentPhimId); // sửa id thành idPhim
        setDanhSachDeXuat(locDeXuat);
      } catch (error) {
        console.error("Lỗi khi lấy phim đề xuất:", error);
      }
    };
    fetchData();
  }, [currentPhimId]);

  const phimHienThi = danhSachDeXuat.slice(0, soLuongHienThi);
  const conThem = danhSachDeXuat.length > soLuongHienThi;

  return (
    <div className="mt-5 p-3 border rounded bg-light">
      <h5 className="fw-bold mb-3">Phim đề xuất</h5>
      <div
        className="d-flex flex-wrap gap-3 overflow-auto"
        style={{ maxHeight: "420px", paddingRight: "10px" }}
      >
        {phimHienThi.map((phim) => (
          <PhimCard key={phim.idPhim} phim={phim} className="flex-grow-1" />
        ))}
      </div>

      {/* Nút "Xem thêm" trên thiết bị nhỏ */}
      <div className="mt-3 d-md-none text-center">
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
