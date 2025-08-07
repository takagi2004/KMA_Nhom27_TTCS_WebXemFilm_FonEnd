import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PhimModel from "../../model/PhimModel";
import { PhimAPI } from "../../api/PhimAPI";
import VideoAPI from "../../api/VideoAPI";

const ChiTietPhim: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [phim, setPhim] = useState<PhimModel | null>(null);
  const [tapDangChon, setTapDangChon] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      PhimAPI.getPhimById(Number(id)).then((data) => {
        setPhim(data);
        if (data.tapPhim && data.tapPhim.length > 0) {
          setTapDangChon(data.tapPhim[0].soTap); // chọn tập đầu mặc định
        }
      });
    }
  }, [id]);

  if (!phim) return <div className="text-light text-center mt-5">Đang tải...</div>;

  const tapHienTai = phim.tapPhim?.find((tap) => tap.soTap === tapDangChon);

  return (
    <div className="container text-light mt-5 pt-5">
      <h2 className="text-warning">{phim.tenPhim}</h2>
      <div className="row">
        {/* VIDEO PLAYER */}
        <div className="col-12 col-lg-8 mb-4">
          {tapHienTai ? (
            <video
              key={tapHienTai.soTap} // key giúp reload khi đổi tập
              src={VideoAPI.getVideoUrl(tapHienTai.video)}
              controls
              className="w-100"
              style={{ maxHeight: "500px", borderRadius: "12px" }}
            />
          ) : (
            <div className="text-muted">Không có video.</div>
          )}
        </div>

        {/* TẬP PHIM */}
        <div className="col-12 col-lg-4">
          <h5 className="mb-3">Danh sách tập</h5>
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
      </div>

      {/* MÔ TẢ */}
      <div className="mt-4">
        <h5>Giới thiệu</h5>
        <p>{phim.moTa}</p>
        <p>
          <strong>Năm:</strong> {phim.namPhatHanh} | <strong>Quốc gia:</strong>{" "}
          {phim.quocGia}
        </p>
      </div>
    </div>
  );
};

export default ChiTietPhim;
