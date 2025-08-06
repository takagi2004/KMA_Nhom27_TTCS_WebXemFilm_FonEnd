import React, { useEffect, useState } from "react";
import { TheLoaiAPI } from "../../api/TheloaiApi";
import { TheLoaiModel } from "../../model/TheLoaiMode";
import "../../styles/DanhSachTheLoai.css";

interface DanhSachTheLoaiProps {
  onChonTheLoai?: (id: number | null) => void;
}

const DanhSachTheLoai: React.FC<DanhSachTheLoaiProps> = ({ onChonTheLoai }) => {
  const [theLoaiList, setTheLoaiList] = useState<TheLoaiModel[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    TheLoaiAPI.getAllTheLoaiWithPhim()
      .then((data) => setTheLoaiList(data))
      .catch(() => console.error("Không thể tải danh sách thể loại"));
  }, []);

  const handleChon = (id: number | null) => {
    setActiveId(id);
    if (onChonTheLoai) onChonTheLoai(id);
  };

  const danhSachHienThi = [{ idTheLoai: null, tenTheLoai: "Tất cả" }, ...theLoaiList];

  return (
    <div className="danh-sach-the-loai-scroll my-4">
      {danhSachHienThi.map((tl) => (
        <button
          key={tl.idTheLoai ?? "all"}
          className={`the-loai-btn ${activeId === tl.idTheLoai ? "active" : ""}`}
          onClick={() => handleChon(tl.idTheLoai)}
        >
          {tl.tenTheLoai}
        </button>
      ))}
    </div>
  );
};

export default DanhSachTheLoai;
