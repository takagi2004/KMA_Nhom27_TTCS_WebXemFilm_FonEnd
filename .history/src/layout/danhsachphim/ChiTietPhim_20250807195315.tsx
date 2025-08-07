import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ToolAccModel from "../../model/ToolAccModel";
import { ToolAccAPI } from "../../api/ToolAccAPI";
import "./ChiTietToolAcc.css"; // CSS riêng

const ChiTietToolAcc: React.FC = () => {
  const { id } = useParams();
  const [toolAcc, setToolAcc] = useState<ToolAccModel | null>(null);
  const [moTaThuGon, setMoTaThuGon] = useState(true);

  useEffect(() => {
    if (id) {
      ToolAccAPI.layToolAccTheoId(Number(id)).then((data) => {
        setToolAcc(data);
      });
    }
  }, [id]);

  if (!toolAcc) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="container py-4">
      <div className="row">
        {/* Cột trái */}
        <div className="col-md-5">
          <img
            src={toolAcc.anh}
            alt={toolAcc.ten}
            className="img-fluid rounded shadow"
          />
          <h3 className="mt-3">{toolAcc.ten}</h3>
          <p className="text-muted">{toolAcc.theLoai?.ten}</p>
          <p className="fw-bold text-danger">Giá: {toolAcc.gia.toLocaleString()} VNĐ</p>
          <button className="btn btn-primary">Mua ngay</button>
        </div>

        {/* Cột phải */}
        <div className="col-md-7">
          <h5 className="fw-bold">Mô tả chi tiết</h5>
          <div className={`mo-ta ${moTaThuGon ? "thu-gon" : ""}`}>
            {toolAcc.moTa}
          </div>
          {toolAcc.moTa.length > 200 && (
            <button
              className="btn btn-link p-0"
              onClick={() => setMoTaThuGon(!moTaThuGon)}
            >
              {moTaThuGon ? "Xem thêm" : "Thu gọn"}
            </button>
          )}

          {toolAcc.demo && (
            <div className="mt-4">
              <h6 className="fw-bold">Demo</h6>
              <div className="ratio ratio-16x9">
                <iframe
                  src={toolAcc.demo}
                  title="Demo"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChiTietToolAcc;
