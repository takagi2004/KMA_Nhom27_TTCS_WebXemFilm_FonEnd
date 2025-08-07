import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DangNhapModel } from "../model/DangNhapModel";
import { DangNhapAPI } from "../api/LoginAPI";
import { xuLyDangNhapThanhCong } from "../utils/authHelper";

const DangNhap: React.FC = () => {
  const [formData, setFormData] = useState<DangNhapModel>({
    tenDangNhap: "",
    matKhau: "",
  });
  const [thongBao, setThongBao] = useState<string>("");
  const [hienMatKhau, setHienMatKhau] = useState<boolean>(false);
  const [dongYDieuKhoan, setDongYDieuKhoan] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dongYDieuKhoan) {
        setThongBao("❗Bạn phải đồng ý với điều khoản sử dụng!");
        return;
    }

    try {
        const data = await DangNhapAPI.dangNhap(formData);
        xuLyDangNhapThanhCong(data.token, data.nguoiDung, navigate);
        setThongBao("🎉 Đăng nhập thành công!");

        // Reload trang toàn bộ
        setTimeout(() => {
        window.location.reload();
        }, 1000); // delay 1s để hiển thị thông báo

    } catch (error: any) {
        setThongBao("❌ Đăng nhập thất bại: " + (error.message || error));
    }
    };


  return (
    <div className="container mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7 col-sm-10">
          <div className="card shadow">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">Đăng nhập</h3>
              {thongBao && (
                <div className="alert alert-info text-center">{thongBao}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Tên đăng nhập</label>
                  <input
                    type="text"
                    name="tenDangNhap"
                    className="form-control"
                    value={formData.tenDangNhap}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 position-relative">
                  <label className="form-label">Mật khẩu</label>
                  <input
                    type={hienMatKhau ? "text" : "password"}
                    name="matKhau"
                    className="form-control pe-5" // padding-right cho icon
                    value={formData.matKhau}
                    onChange={handleChange}
                    required
                  />
                  <i
                    className={`bi ${
                      hienMatKhau ? "bi-eye-slash-fill" : "bi-eye-fill"
                    } position-absolute top-50 end-0 translate-middle-y me-3`}
                    style={{ cursor: "pointer", fontSize: "1.25rem", color: "#555" }}
                    onClick={() => setHienMatKhau(!hienMatKhau)}
                    title={hienMatKhau ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  />
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={dongYDieuKhoan}
                    onChange={() => setDongYDieuKhoan(!dongYDieuKhoan)}
                    id="dongYDieuKhoan"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="dongYDieuKhoan"
                  >
                    Tôi đồng ý với{" "}
                    <a
                      href="/dieu-khoan"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      điều khoản sử dụng
                    </a>
                  </label>
                </div>

                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-success">
                    Đăng nhập
                  </button>
                </div>

                <div className="text-center">
                  Chưa có tài khoản?{" "}
                  <a href="/dang-ky" className="text-decoration-underline">
                    Đăng ký
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DangNhap;
