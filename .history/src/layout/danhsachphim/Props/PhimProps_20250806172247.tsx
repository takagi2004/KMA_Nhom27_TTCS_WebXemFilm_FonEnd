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
    <div
      className={`phim-card position-relative overflow-hidden rounded shadow-sm ${className || ""}`}
    >
      <img
        src={phim.anhBia || "https://via.placeholder.com/300x400?text=No+Image"}
        className="w-100 h-100 object-fit-cover"
        alt={phim.tenPhim}
      />

      {/* Overlay gradient */}
      <div className="phim-card-overlay d-flex flex-column justify-content-end p-2">
        <h6 className="mb-1 text-truncate fw-bold">{phim.tenPhim}</h6>
        <p className="mb-0 small text-light">{moTaRutGon}</p>
      </div>
    </div>
  );
};

export default PhimCard;
