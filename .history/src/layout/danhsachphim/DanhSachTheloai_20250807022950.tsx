import React, { useEffect, useState } from "react";
import { TheLoaiAPI } from "../../api/TheloaiApi";
import { TheLoaiModel } from "../../model/TheLoaiMode";

interface DanhSachTheLoaiProps {
  onChonTheLoai?: (id: number | null) => void; // callback khi chọn thể loại
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

  return (
    <div className="danh-sach-the-loai py-3 px-3">
      <button
        className={`the-loai-btn ${activeId === null ? "active" : ""}`}
        onClick={() => handleChon(null)}
      >
        Tất cả
      </button>
      {theLoaiList.map((tl) => (
        <button
          key={tl.idTheLoai}
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
