import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PhimModel from "../../../model/PhimModel";
import { TheLoaiAPI } from "../../../api/TheloaiApi";
import DanhSachTheLoai from "./DanhSachTheloai";
import PhimCard from "../Props/PhimCard";
import "../../../App.css";

const ChiTietTheLoai: React.FC = () => {
  const { idTheLoai } = useParams();
  const [phimList, setPhimList] = useState<PhimModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 6 phim x 2 hàng mỗi trang

  useEffect(() => {
    setCurrentPage(1); // Reset về trang đầu khi đổi thể loại
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

  // Tính toán phân trang
  const totalPages = Math.ceil(phimList.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentPhimList = phimList.slice(startIdx, startIdx + itemsPerPage);

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="chi-tiet-the-loai-page text-center">
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

      {/* Grid phim */}
      <div className="phim-grid-6 mx-auto">
        {currentPhimList.length > 0 ? (
          currentPhimList.map((phim) => (
            <div key={phim.idPhim} className="phim-card-wrapper">
              <PhimCard phim={phim} />
            </div>
          ))
        ) : (
          !loading && <div className="empty-text">Chưa có phim nào.</div>
        )}
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <button
            className="page-btn"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            «
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`page-btn ${currentPage === page ? "active" : ""}`}
              onClick={() => changePage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="page-btn"
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      )}
    </div>
  );
};

export default ChiTietTheLoai;
