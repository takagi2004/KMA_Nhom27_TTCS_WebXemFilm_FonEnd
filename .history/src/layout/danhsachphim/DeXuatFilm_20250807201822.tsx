import React, { useEffect, useState } from "react";
import PhimModel from "../../model/PhimModel";
import { PhimAPI } from "../../api/PhimAPI";
import PhimCard from "./Props/PhimCard";

interface DeXuatFilmProps {
  phimHienTaiId: number;
}

const DeXuatFilm: React.FC<DeXuatFilmProps> = ({ phimHienTaiId }) => {
  const [dsDeXuat, setDsDeXuat] = useState<PhimModel[]>([]);
  const [soLuongHienThi, setSoLuongHienThi] = useState<number>(4);

  useEffect(() => {
    const fetchDeXuat = async () => {
      try {
        const allPhim = await PhimAPI.getTatCaPhim();
        const locPhim = allPhim.filter(
          (phim) => phim.idPhim !== phimHienTaiId
        );
        setDsDeXuat(locPhim);
      } catch (error) {
        console.error("Lỗi khi tải phim đề xuất", error);
      }
    };

    fetchDeXuat();
  }, [phimHienTaiId]);

  const handleXemThem = () => {
    setSoLuongHienThi((prev) => prev + 4);
  };

  const phimDeXuatHienTai = dsDeXuat.slice(0, soLuongHienThi);

  return (
    <div className="mt-6 border rounded-lg p-4 bg-white shadow-md">
      <h3 className="text-xl font-bold mb-4">Phim đề xuất</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto">
        {phimDeXuatHienTai.map((phim) => (
          <PhimCard key={phim.idPhim} phim={phim} />
        ))}
      </div>

      {soLuongHienThi < dsDeXuat.length && (
        <div className="text-center mt-4 md:hidden">
          <Button onClick={handleXemThem} variant="outline">
            Xem thêm
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeXuatFilm;