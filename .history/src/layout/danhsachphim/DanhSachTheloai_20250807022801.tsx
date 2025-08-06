import React, { useEffect, useState } from "react";
import { TheLoaiAPI } from "../../api/TheloaiApi";
import { TheLoaiModel } from "../../model/TheLoaiMode";

interface ThanhTheLoaiProps {
  onChonTheLoai?: (id: number | null) => void; // callback khi chọn thể loại
}

const ThanhTheLoai: React.FC<ThanhTheLoaiProps> = ({ onChonTheLoai }) => {
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
    <div className="thanh-the-loai d-flex flex-nowrap overflow-auto py-2 px-3">
      <button
        className={`btn me-2 ${activeId === null ? "btn-primary" : "btn-outline-primary"}`}
        onClick={() => handleChon(null)}
      >
        Tất cả
      </button>
      {theLoaiList.map((tl) => (
        <button
          key={tl.idTheLoai}
          className={`btn me-2 ${activeId === tl.idTheLoai ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => handleChon(tl.idTheLoai)}
        >
          {tl.tenTheLoai}
        </button>
      ))}
    </div>
  );
};

export default ThanhTheLoai;
