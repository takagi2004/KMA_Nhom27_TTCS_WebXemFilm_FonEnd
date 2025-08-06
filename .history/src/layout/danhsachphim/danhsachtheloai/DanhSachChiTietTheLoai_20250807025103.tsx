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
    <div className="container-fluid py-4">
      <h2 className="text-light fw-bold mb-4 text-center">
        Danh sách phim theo thể loại
      </h2>

      <DanhSachTheLoai onChonTheLoai={(id) => {
        if (id === null) loadAllPhim();
        else loadPhimByTheLoai(id);
      }} />

      {loading && <div className="text-light text-center mt-4">Đang tải phim...</div>}
      {error && <div className="text-danger text-center mt-4">{error}</div>}

      <div className="row g-3 mt-3">
        {phimList.length > 0 ? (
          phimList.map((phim) => (
            <div
              key={phim.idPhim}
              className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center"
            >
              <PhimCard phim={phim} />
            </div>
          ))
        ) : (
          !loading && <div className="text-light text-center">Chưa có phim nào.</div>
        )}
      </div>
    </div>
  );
};

export default ChiTietTheLoai;
