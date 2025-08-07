import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PhimModel from "../../model/PhimModel";
import { PhimAPI } from "../../api/PhimAPI";
import VideoAPI from "../../api/VideoAPI";
import DanhGiaModel from "../../model/DanhGiaModel";
import DeXuatFilm from "./DeXuatFilm";
import "./ChiTietPhim.css"; // Tạo file CSS này để dùng responsive order

const ChiTietPhim: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [phim, setPhim] = useState<PhimModel | null>(null);
  const [tapDangChon, setTapDangChon] = useState<number | null>(null);
  const [binhLuanMoi, setBinhLuanMoi] = useState<string>("");
  const [soSaoMoi, setSoSaoMoi] = useState<number>(5);
  const [moTaDayDu, setMoTaDayDu] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const data = await PhimAPI.getPhimById(Number(id));
        setPhim(data);
        if (Array.isArray(data.tapPhim) && data.tapPhim.length > 0) {
          setTapDangChon(data.tapPhim[0].soTap);
        }
      };
      fetchData();
    }
  }, [id]);

  if (!phim) return <div className="text-light text-center mt-5">Đang tải...</div>;

  const tapHienTai = phim.tapPhim?.find((tap) => tap.soTap === tapDangChon);

  const handleGuiBinhLuan = (e: React.FormEvent) => {
    e.preventDefault();
    const danhGiaMoi: DanhGiaModel = {
      soSao: soSaoMoi,
      binhLuan: binhLuanMoi,
      nguoiDanhGia: "Khách",
      ngayBinhLuan: new Date().toISOString(),
    };

    setPhim((prev) =>
      prev ? { ...prev, danhGia: [danhGiaMoi, ...(prev.danhGia || [])] } : prev
    );

    setBinhLuanMoi("");
    setSoSaoMoi(5);
  };

  return (
    <div className="container text-light mt-5 pt-4">
      <div className="d-flex flex-column flex-lg-row gap-4">

        {/* LEFT: Video + Nội dung */}
        <div className="flex-grow-1 d-flex flex-column gap-4">

          {/* Video */}
          <div className="video-player-section">
            <h2 className="text-warning">{phim.tenPhim}</h2>
            {tapHienTai ? (
              <video
                key={tapHienTai.soTap}
                src={VideoAPI.getVideoUrl(tapHienTai.video)}
                controls
                className="w-100 mb-3"
                style={{ maxHeight: "500px", borderRadius: "12px" }}
              />
            ) : (
              <div className="text-muted">Không có video.</div>
            )}
          </div>

          {/* Nội dung sắp xếp theo responsive order */}
          <div className="d-flex flex-column gap-4">

            {/* Danh sách tập */}
            {Array.isArray(phim.tapPhim) && phim.tapPhim.length > 0 && (
              <div className="section section-tapphim bg-dark p-3 rounded border border-secondary">
                <h5 className="mb-3 text-warning">Danh sách tập</h5>
                <div className="d-flex flex-wrap gap-2">
                  {phim.tapPhim.map((tap) => (
                    <button
                      key={tap.soTap}
                      className={`btn btn-sm ${tap.soTap === tapDangChon ? "btn-warning" : "btn-outline-light"}`}
                      onClick={() => setTapDangChon(tap.soTap)}
                    >
                      Tập {tap.soTap}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Giới thiệu */}
            <div className="section section-gioithieu">
              <h5 className="mb-3">Giới thiệu</h5>
              <div
                className="position-relative bg-dark p-3 rounded border border-secondary"
                style={{
                  maxHeight: moTaDayDu ? "none" : "6em",
                  overflow: "hidden",
                  WebkitLineClamp: 3,
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {phim.moTa}
                {!moTaDayDu && phim.moTa && phim.moTa.length > 300 && (
                  <div
                    className="position-absolute bottom-0 start-0 end-0 text-end pe-2 pb-1"
                    style={{
                      background: "linear-gradient(to top, #1c1c1c, transparent)",
                    }}
                  >
                    <span className="text-muted">...</span>
                  </div>
                )}
              </div>

              {phim.moTa && phim.moTa.length > 300 && (
                <button
                  className="btn btn-link btn-sm text-warning mt-2 p-0"
                  onClick={() => setMoTaDayDu(!moTaDayDu)}
                >
                  {moTaDayDu ? "Thu gọn ▲" : "Xem thêm ▼"}
                </button>
              )}

              <div className="mt-3 d-flex flex-wrap gap-3 text-light small">
                <div><strong>Năm:</strong> {phim.namPhatHanh}</div>
                <div><strong>Quốc gia:</strong> {phim.quocGia}</div>
                {Array.isArray(phim.theLoai) && phim.theLoai.length > 0 && (
                  <div><strong>Thể loại:</strong> {phim.theLoai.join(", ")}</div>
                )}
              </div>
            </div>

            {/* Đề xuất */}
            <div className="section section-dexuat">
              <DeXuatFilm currentPhimId={phim.idPhim} title="Phim đề xuất" />
            </div>

            {/* Bình luận */}
            <div className="section section-binhluan">
              <h5>Bình luận ({phim.danhGia?.length || 0})</h5>
              <form className="mb-3" onSubmit={handleGuiBinhLuan}>
                <textarea
                  className="form-control mb-2"
                  rows={3}
                  placeholder="Viết bình luận của bạn..."
                  value={binhLuanMoi}
                  onChange={(e) => setBinhLuanMoi(e.target.value)}
                  required
                />
                <div className="mb-2 d-flex align-items-center gap-2">
                  <label className="mb-0">Số sao:</label>
                  <select
                    value={soSaoMoi}
                    onChange={(e) => setSoSaoMoi(Number(e.target.value))}
                    className="form-select w-auto"
                  >
                    {[5, 4, 3, 2, 1].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <button className="btn btn-primary btn-sm">Gửi đánh giá</button>
              </form>

              {phim.danhGia?.length ? (
                phim.danhGia.map((dg, idx) => (
                  <div
                    key={idx}
                    className="list-group-item bg-dark text-light border-secondary mb-2"
                  >
                    <div className="d-flex justify-content-between">
                      <strong>{dg.nguoiDanhGia}</strong>
                      <span className="text-warning">⭐ {dg.soSao}/5</span>
                    </div>
                    <div>{dg.binhLuan}</div>
                    <small className="text-muted">
                      {new Date(dg.ngayBinhLuan).toLocaleString("vi-VN")}
                    </small>
                  </div>
                ))
              ) : (
                <div className="text-muted">Chưa có đánh giá nào.</div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ChiTietPhim;
