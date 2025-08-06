import React from "react";
import PhimModel from "../../model/PhimModel";

interface PhimProps {
  phim: PhimModel;
}

const PhimCard: React.FC<PhimProps> = ({ phim }) => {
  return (
    <div className="card shadow-sm m-2" style={{ width: "18rem" }}>
      <img
        src={phim.anhBia || "https://via.placeholder.com/300x400?text=No+Image"}
        className="card-img-top"
        alt={phim.tenPhim}
        style={{ height: "250px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title text-truncate">{phim.tenPhim}</h5>
        <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
          {phim.moTa && phim.moTa.length > 60
            ? phim.moTa.substring(0, 60) + "..."
            : phim.moTa || "Chưa có mô tả"}
        </p>
      </div>
    </div>
  );
};

export default PhimCard;
