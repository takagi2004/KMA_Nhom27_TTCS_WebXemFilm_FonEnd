import React from "react";
import PhimModel from "../../../model/PhimModel";

interface PhimProps {
  phim: PhimModel;
  className?: string;
}

const PhimCard: React.FC<PhimProps> = ({ phim, className }) => {
  return (
    <div
      className={`card shadow-sm border-0 overflow-hidden phim-card ${className || ""}`}
    >
      <img
        src={phim.anhBia || "https://via.placeholder.com/300x400?text=No+Image"}
        className="card-img-top"
        alt={phim.tenPhim}
      />
      <div className="phim-card-overlay">
        <h6 className="mb-1 text-truncate">{phim.tenPhim}</h6>
        <p className="mb-0 small text-light">
          {phim.moTa && phim.moTa.length > 60
            ? phim.moTa.substring(0, 60) + "..."
            : phim.moTa || "Chưa có mô tả"}
        </p>
      </div>
    </div>
  );
};

export default PhimCard;
