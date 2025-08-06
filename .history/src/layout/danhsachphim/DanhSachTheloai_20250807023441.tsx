import React, { useEffect, useRef, useState } from "react";
import { TheLoaiAPI } from "../../api/TheloaiApi";
import { TheLoaiModel } from "../../model/TheLoaiMode";
import "../../styles/DanhSachTheLoai.css";

interface DanhSachTheLoaiProps {
  onChonTheLoai?: (id: number | null) => void;
}

const DanhSachTheLoai: React.FC<DanhSachTheLoaiProps> = ({ onChonTheLoai }) => {
  const [theLoaiList, setTheLoaiList] = useState<TheLoaiModel[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    TheLoaiAPI.getAllTheLoaiWithPhim()
      .then((data) => setTheLoaiList(data))
      .catch(() => console.error("Không thể tải danh sách thể loại"));
  }, []);

  const handleChon = (id: number | null) => {
    setActiveId(id);
    if (onChonTheLoai) onChonTheLoai(id);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = container.clientWidth / 2; // scroll nửa màn hình
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const danhSachHienThi = [{ idTheLoai: null, tenTheLoai: "Tất cả" }, ...theLoaiList];

  return (
    <div className="danh-sach-the-loai-container my-4">
      <button
        className="the-loai-arrow left"
        onClick={() => scroll("left")}
        aria-label="Cuộn trái"
      >
        ❮
      </button>

      <div className="danh-sach-the-loai-scroll" ref={scrollRef}>
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

      <button
        className="the-loai-arrow right"
        onClick={() => scroll("right")}
        aria-label="Cuộn phải"
      >
        ❯
      </button>
    </div>
  );
};

export default DanhSachTheLoai;
