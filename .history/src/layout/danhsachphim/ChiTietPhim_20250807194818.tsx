import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PhimModel from "../../model/PhimModel";
import { PhimAPI } from "../../api/PhimAPI";
import VideoAPI from "../../api/VideoAPI";
import DanhGiaModel from "../../model/DanhGiaModel";

const ChiTietPhim: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [phim, setPhim] = useState<PhimModel | null>(null);
  const [tapDangChon, setTapDangChon] = useState<number | null>(null);
  const [binhLuanMoi, setBinhLuanMoi] = useState<string>("");
  const [soSaoMoi, setSoSaoMoi] = useState<number>(5);
  const [deXuat, setDeXuat] = useState<PhimModel[]>([]);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const data = await PhimAPI.getPhimById(Number(id));
        setPhim(data);
        if (data.tapPhim && data.tapPhim.length > 0) {
          setTapDangChon(data.tapPhim[0].soTap);
        }
      };

      fetchData();

      // Lấy phim đề xuất (giả lập từ top thịnh hành, loại bỏ phim hiện tại)
      PhimAPI.getTopThinhHanh(6).then((list) => {
        const filtered = list.filter((p) => p.idPhim !== Number(id));
        setDeXuat(filtered);
      });
    }
  }, [id]);

  if (!phim) return <div className="text-light text-center mt-5">Đang tải...</div>;

  const tapHienTai = phim.tapPhim?.find((tap) => tap.soTap === tapDangChon);

  // Gửi bình luận
  const handleGuiBinhLuan = (e: React.FormEvent) => {
    e.preventDefault();
    const danhGiaMoi: DanhGiaModel = {
      soSao: soSaoMoi,
      binhLuan: binhLuanMoi,
      nguoiDanhGia: "Khách",
      ngayBinhLuan: new Date().toISOString(),
    };

    setPhim((prev) =>
      prev
        ? {
            ...prev,
            danhGia: [danhGiaMoi, ...(prev.danhGia || [])],
          }
        : prev
    );

    setBinhLuanMoi("");
    setSoSaoMoi(5);
  };

  return (
    <div className="container text-light mt-5 pt-5">
      <div className="row">
        {/* VIDEO CHÍNH + MÔ TẢ + BÌNH LUẬN */}
        <div className="col-lg-8">
          <h2 className="text-warning">{phim.tenPhim}</h2>

          {/* VIDEO PLAYER */}
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

          {/* DANH SÁCH TẬP */}
          <div className="mb-4">
            <h5>Danh sách tập</h5>
            <div className="d-flex flex-wrap gap-2">
              {phim.tapPhim?.map((tap) => (
                <button
                  key={tap.soTap}
                  className={`btn btn-sm ${
                    tap.soTap === tapDangChon ? "btn-warning" : "btn-outline-light"
                  }`}
                  onClick={() => setTapDangChon(tap.soTap)}
                >
                  Tập {tap.soTap}
                </button>
              ))}
            </div>
          </div>

          {/* MÔ TẢ PHIM */}
          <div className="mb-4">
            <h5>Giới thiệu</h5>
            <p>{phim.moTa}</p>
            <p>
              <strong>Năm:</strong> {phim.namPhatHanh} |{" "}
              <strong>Quốc gia:</strong> {phim.quocGia}
            </p>
            {Array.isArray(phim.theLoai) && phim.theLoai.length > 0 && (
  <p>
    <strong>Thể loại:</strong> {phim.theLoai.join(", ")}
  </p>
)}

          </div>

          {/* BÌNH LUẬN */}
          <div className="mb-5">
            <h5>Bình luận ({phim.danhGia?.length || 0})</h5>
            <form className="mb-3" onSubmit={handleGuiBinhLuan}>
              <div className="mb-2">
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Viết bình luận của bạn..."
                  value={binhLuanMoi}
                  onChange={(e) => setBinhLuanMoi(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="me-2">Số sao:</label>
                <select
                  value={soSaoMoi}
                  onChange={(e) => setSoSaoMoi(Number(e.target.value))}
                  className="form-select w-auto d-inline-block"
                >
                  {[5, 4, 3, 2, 1].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn-primary btn-sm">Gửi đánh giá</button>
            </form>

            {phim.danhGia?.length ? (
              <div className="list-group">
                {phim.danhGia.map((dg, index) => (
                  <div
                    key={index}
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
                ))}
              </div>
            ) : (
              <div className="text-muted">Chưa có đánh giá nào.</div>
            )}
          </div>
        </div>

        {/* PHIM ĐỀ XUẤT */}
        <div className="col-lg-4">
          <h5 className="mb-3">Đề xuất cho bạn</h5>
          {deXuat.map((p) => (
            <Link
              key={p.idPhim}
              to={`/phim/${p.idPhim}`}
              className="text-decoration-none text-light mb-3 d-block"
            >
              <div className="d-flex">
                <img
                  src={p.anhBia || "https://via.placeholder.com/120x70"}
                  alt={p.tenPhim}
                  style={{ width: "120px", height: "70px", objectFit: "cover", borderRadius: "8px" }}
                />
                <div className="ms-2">
                  <strong>{p.tenPhim}</strong>
                  <div className="text-muted small">
                    {p.namPhatHanh} • {p.theLoai?.join(", ")}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChiTietPhim;
