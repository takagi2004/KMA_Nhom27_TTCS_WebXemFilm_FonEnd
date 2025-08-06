import React from "react";
import PhimModel from "../../../model/PhimModel";

interface PhimProps {
  phim: PhimModel;
}

const PhimCard: React.FC<PhimProps> = ({ phim }) => {
  return (
    <div
      className="card shadow-sm m-2 border-0 overflow-hidden"
      style={{ width: "18rem", backgroundColor: "transparent" }}
    >
      <img
        src={phim.anhBia || "https://via.placeholder.com/300x400?text=No+Image"}
        className="card-img-top"
        alt={phim.tenPhim}
        style={{ height: "250px", objectFit: "cover" }}
      />
      <div
        className="p-3"
        style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          color: "white",
          minHeight: "100px",
        }}
      >
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
