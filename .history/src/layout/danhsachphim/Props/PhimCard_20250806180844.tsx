import React from "react";
import PhimModel from "../../../model/PhimModel";

interface PhimProps {
  phim: PhimModel;
  className?: string;
}

const PhimCard: React.FC<PhimProps> = ({ phim, className }) => {
  const moTaRutGon =
    phim.moTa && phim.moTa.length > 60
      ? phim.moTa.substring(0, 60) + "..."
      : phim.moTa || "Chưa có mô tả";

  // Tính số tập hiện có
  const tongTap = phim.tapPhim?.length || 0;
  const tongTapDuKien = phim.soLuong || tongTap;

  const hienThiTap =
    tongTapDuKien > 0
      ? tongTap >= tongTapDuKien
        ? `Full ${tongTapDuKien}/${tongTapDuKien}`
        : `Tập ${tongTap}/${tongTapDuKien}`
      : tongTap > 0
      ? `Tập ${tongTap}`
      : "";

  return (
    <div className={`phim-card ${className || ""}`}>
      <div className="phim-card-img-wrapper">
        <img
          src={phim.anhBia || "https://via.placeholder.com/300x400?text=No+Image"}
          alt={phim.tenPhim}
        />
        {hienThiTap && (
          <div className="phim-card-episode-badge">
            {hienThiTap}
          </div>
        )}
      </div>
      <div className="phim-card-info">
        <h6>{phim.tenPhim}</h6>
        <p>{moTaRutGon}</p>
      </div>
    </div>
  );
};

export default PhimCard;
