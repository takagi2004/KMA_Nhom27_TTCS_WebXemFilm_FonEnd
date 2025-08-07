import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PhimAPI } from "../../api/PhimAPI";
import PhimModel from "../../model/PhimModel";

const ChiTietPhim: React.FC = () => {
  const { id } = useParams();
  const [phim, setPhim] = useState<PhimModel | null>(null);
  const [moTaDayDu, setMoTaDayDu] = useState(false);

  useEffect(() => {
    if (id) {
      PhimAPI.layPhimTheoId(id)
        .then((response) => setPhim(response.data))
        .catch((error) => console.error("Lỗi khi lấy phim:", error));
    }
  }, [id]);

  if (!phim) return <div className="text-center">Đang tải dữ liệu phim...</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">{phim.tenPhim}</h2>
      <div className="row">
        {/* Cột trái - ảnh phim */}
        <div className="col-md-4 text-center mb-3">
          <img
            src={phim.anh}
            alt={phim.tenPhim}
            className="img-fluid rounded shadow"
          />
        </div>

        {/* Cột phải - thông tin phim */}
        <div className="col-md-8">
          <table className="table table-bordered table-striped">
            <tbody>
              <tr>
                <th>Thể loại</th>
                <td>{phim.theLoai?.tenTheLoai || "Không xác định"}</td>
              </tr>
              <tr>
                <th>Thời lượng</th>
                <td>{phim.thoiLuong} phút</td>
              </tr>
              <tr>
                <th>Năm phát hành</th>
                <td>{phim.namPhatHanh}</td>
              </tr>
              <tr>
                <th>Đạo diễn</th>
                <td>{phim.daoDien}</td>
              </tr>
              <tr>
                <th>Diễn viên</th>
                <td>{phim.dienVien}</td>
              </tr>
              <tr>
                <th>Quốc gia</th>
                <td>{phim.quocGia}</td>
              </tr>
              <tr>
                <th>Mô tả</th>
                <td>
                  <div className="text-justify">
                    {moTaDayDu || !phim.moTa || phim.moTa.length < 300
                      ? phim.moTa
                      : phim.moTa.substring(0, 300) + "..."}
                    {phim.moTa && phim.moTa.length > 300 && (
                      <div>
                        <button
                          className="btn btn-link p-0"
                          onClick={() => setMoTaDayDu(!moTaDayDu)}
                        >
                          {moTaDayDu ? "Thu gọn ▲" : "Xem thêm ▼"}
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChiTietPhim;
