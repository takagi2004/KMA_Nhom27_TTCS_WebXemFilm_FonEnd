// ==================== PhimCard.tsx ====================
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

  return (
    <div className={`phim-card ${className || ""}`}>
      <img
        src={phim.anhBia || "https://via.placeholder.com/300x400?text=No+Image"}
        alt={phim.tenPhim}
      />
      <div className="phim-card-overlay">
        <h6 className="phim-ten">{phim.tenPhim}</h6>
        <p className="phim-mo-ta">{moTaRutGon}</p>
      </div>
    </div>
  );
};

export default PhimCard;
