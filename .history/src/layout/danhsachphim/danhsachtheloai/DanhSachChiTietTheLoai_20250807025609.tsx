import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PhimModel from "../../../model/PhimModel";
import { TheLoaiAPI } from "../../../api/TheloaiApi";
import DanhSachTheLoai from "./DanhSachTheloai";
import PhimCard from "../Props/PhimCard";

const ChiTietTheLoai: React.FC = () => {
  const { idTheLoai } = useParams();
  const [phimList, setPhimList] = useState<PhimModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (idTheLoai === "0" || !idTheLoai) {
      loadAllPhim();
    } else {
      loadPhimByTheLoai(Number(idTheLoai));
    }
  }, [idTheLoai]);

  const loadAllPhim = () => {
    setLoading(true);
    TheLoaiAPI.getAllTheLoaiWithPhim()
      .then((listTheLoai) => {
        const allPhim = listTheLoai.flatMap((tl) => tl.phimList || []);
        setPhimList(allPhim);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải danh sách phim");
        setLoading(false);
      });
  };

  const loadPhimByTheLoai = (id: number) => {
    setLoading(true);
    TheLoaiAPI.getPhimByTheLoaiId(id)
      .then((data) => {
        setPhimList(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải phim theo thể loại");
        setLoading(false);
      });
  };

  return (
    <div className="chi-tiet-the-loai-page">
      <h2 className="page-title">Danh sách phim theo thể loại</h2>

      {/* Thanh lọc thể loại */}
      <DanhSachTheLoai
        onChonTheLoai={(id) => {
          if (id === null) loadAllPhim();
          else loadPhimByTheLoai(id);
        }}
      />

      {loading && <div className="loading-text">Đang tải phim...</div>}
      {error && <div className="error-text">{error}</div>}

      {/* Grid 7 phim mỗi hàng */}
      <div className="phim-grid-7">
        {phimList.length > 0 ? (
          phimList.map((phim) => (
            <div key={phim.idPhim} className="phim-card-wrapper">
              <PhimCard phim={phim} />
            </div>
          ))
        ) : (
          !loading && <div className="empty-text">Chưa có phim nào.</div>
        )}
      </div>
    </div>
  );
};

export default ChiTietTheLoai;
