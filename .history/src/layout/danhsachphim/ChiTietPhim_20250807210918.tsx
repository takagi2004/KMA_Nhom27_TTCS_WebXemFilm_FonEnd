import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PhimModel from "../../model/PhimModel";
import { PhimAPI } from "../../api/PhimAPI";
import VideoAPI from "../../api/VideoAPI";
import DanhGiaModel from "../../model/DanhGiaModel";
import DeXuatFilm from "./DeXuatFilm";
import BangXepHang from "./BangXepHang";

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

  if (!phim) return <div className="text-light text-center mt-5">\u0110ang t\u1ea3i...</div>;

  const tapHienTai = phim.tapPhim?.find((tap) => tap.soTap === tapDangChon);

  const handleGuiBinhLuan = (e: React.FormEvent) => {
    e.preventDefault();
    const danhGiaMoi: DanhGiaModel = {
      soSao: soSaoMoi,
      binhLuan: binhLuanMoi,
      nguoiDanhGia: "Kh\u00e1ch",
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

  const renderGioiThieu = (
    <div className="mb-5">
      <h5 className="mb-3">Gi\u1edbi thi\u1ec7u</h5>
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
            style={{ background: "linear-gradient(to top, #1c1c1c, transparent)" }}
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
          {moTaDayDu ? "Thu g\u1ecdn \u25b2" : "Xem th\u00eam \u25bc"}
        </button>
      )}
      <div className="mt-3 d-flex flex-wrap gap-3 text-light small">
        <div><strong>N\u0103m:</strong> {phim.namPhatHanh}</div>
        <div><strong>Qu\u1ed1c gia:</strong> {phim.quocGia}</div>
        {phim.theLoai && phim.theLoai.length > 0 && (
          <div><strong>Th\u1ec3 lo\u1ea1i:</strong> {phim.theLoai.join(", ")}</div>
        )}
      </div>
    </div>
  );

  const renderBinhLuan = (
    <div>
      <h5>B\u00ecnh lu\u1eadn ({phim.danhGia?.length || 0})</h5>
      <form className="mb-3" onSubmit={handleGuiBinhLuan}>
        <textarea
          className="form-control mb-2"
          rows={3}
          placeholder="Vi\u1ebft b\u00ecnh lu\u1eadn c\u1ee7a b\u1ea1n..."
          value={binhLuanMoi}
          onChange={(e) => setBinhLuanMoi(e.target.value)}
          required
        />
        <div className="mb-2 d-flex align-items-center gap-2">
          <label className="me-2 mb-0">S\u1ed1 sao:</label>
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
        <button className="btn btn-primary btn-sm">G\u1eedi \u0111\u00e1nh gi\u00e1</button>
      </form>
      {phim.danhGia?.length ? (
        <div className="list-group">
          {phim.danhGia.map((dg, index) => (
            <div key={index} className="list-group-item bg-dark text-light border-secondary mb-2">
              <div className="d-flex justify-content-between">
                <strong>{dg.nguoiDanhGia}</strong>
                <span className="text-warning">\u2b50 {dg.soSao}/5</span>
              </div>
              <div>{dg.binhLuan}</div>
              <small className="text-muted">{new Date(dg.ngayBinhLuan).toLocaleString("vi-VN")}</small>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-muted">Ch\u01b0a c\u00f3 \u0111\u00e1nh gi\u00e1 n\u00e0o.</div>
      )}
    </div>
  );

  const renderDeXuat = <DeXuatFilm currentPhimId={phim.idPhim} title="\u0110\u1ec1 xu\u1ea5t cho b\u1ea1n" />;

  return (
    <div className="container text-light mt-5 pt-4">
      <div className="row">
        <div className="col-12 mb-4">
          <h2 className="text-warning">{phim.tenPhim}</h2>
        </div>

        <div className="col-lg-8 mb-5">
          {tapHienTai ? (
            <video
              key={tapHienTai.soTap}
              src={VideoAPI.getVideoUrl(tapHienTai.video)}
              controls
              className="w-100 mb-3"
              style={{ maxHeight: "500px", borderRadius: "12px" }}
            />
          ) : (
            <div className="text-muted">Kh\u00f4ng c\u00f3 video.</div>
          )}

          {Array.isArray(phim.tapPhim) && phim.tapPhim.length > 0 && (
            <div className="mb-4">
              <h5 className="mb-2">Danh s\u00e1ch t\u1eadp</h5>
              <div className="d-flex flex-wrap gap-2">
                {phim.tapPhim.map((tap) => (
                  <button
                    key={tap.soTap}
                    className={`btn btn-sm ${tap.soTap === tapDangChon ? "btn-warning" : "btn-outline-light"}`}
                    onClick={() => setTapDangChon(tap.soTap)}
                  >
                    T\u1eadp {tap.soTap}
                  </button>
                ))}
              </div>
            </div>
          )}

          {renderGioiThieu}
          {renderDeXuat}
          {renderBinhLuan}
        </div>

        <div className="col-lg-4 d-none d-lg-block">
          {renderDeXuat}
          <BangXepHang />
        </div>
      </div>
    </div>
  );
};

export default ChiTietPhim;