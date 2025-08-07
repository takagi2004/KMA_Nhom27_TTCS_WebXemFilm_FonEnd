import React, { useState } from "react";
import { DangKyAPI } from "../api/LoginAPI";
import { DangKyModel } from "../model/DangKyModel";
import { useNavigate } from "react-router-dom";

const DangKyNguoiDung: React.FC = () => {
  const [formData, setFormData] = useState<DangKyModel>({
    tenDangNhap: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDienThoai: "",
    gioiTinh: "NAM",
  });

  const [matKhauNhapLai, setMatKhauNhapLai] = useState<string>("");
  const [hienMatKhau, setHienMatKhau] = useState<boolean>(false);
  const [hienMatKhauNhapLai, setHienMatKhauNhapLai] = useState<boolean>(false);

  const [thongBao, setThongBao] = useState<string>("");
  const [dongY, setDongY] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setThongBao("");

    if (!dongY) {
      setThongBao("❗ Bạn phải đồng ý với điều khoản sử dụng.");
      return;
    }

    if (formData.matKhau !== matKhauNhapLai) {
      setThongBao("❗ Mật khẩu nhập lại không khớp.");
      return;
    }

    try {
      await DangKyAPI.dangKyTaiKhoan(formData);
      setThongBao("🎉 Đăng ký thành công! Chuyển sang trang đăng nhập...");
      setTimeout(() => navigate("/dang-nhap"), 2000);
    } catch (error) {
      console.error("Lỗi:", error);
      setThongBao("❌ Đăng ký thất bại: " + error);
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="card shadow">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">Đăng ký tài khoản</h3>
              {thongBao && (
                <div className="alert alert-info text-center">{thongBao}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Tên đăng nhập</label>
                  <input
                    type="text"
                    className="form-control"
                    name="tenDangNhap"
                    value={formData.tenDangNhap}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 position-relative">
                  <label className="form-label">Mật khẩu</label>
                  <input
                    type={hienMatKhau ? "text" : "password"}
                    className="form-control pe-5"
                    name="matKhau"
                    value={formData.matKhau}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                  <i
                    className={`bi ${
                      hienMatKhau ? "bi-eye-slash-fill" : "bi-eye-fill"
                    } position-absolute top-50 end-0 translate-middle-y me-3`}
                    style={{ cursor: "pointer", fontSize: "1.25rem", color: "#555" }}
                    onClick={() => setHienMatKhau(!hienMatKhau)}
                    title={hienMatKhau ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  ></i>
                </div>

                <div className="mb-3 position-relative">
                  <label className="form-label">Nhập lại mật khẩu</label>
                  <input
                    type={hienMatKhauNhapLai ? "text" : "password"}
                    className="form-control pe-5"
                    value={matKhauNhapLai}
                    onChange={(e) => setMatKhauNhapLai(e.target.value)}
                    required
                    minLength={6}
                  />
                  <i
                    className={`bi ${
                      hienMatKhauNhapLai ? "bi-eye-slash-fill" : "bi-eye-fill"
                    } position-absolute top-50 end-0 translate-middle-y me-3`}
                    style={{ cursor: "pointer", fontSize: "1.25rem", color: "#555" }}
                    onClick={() => setHienMatKhauNhapLai(!hienMatKhauNhapLai)}
                    title={hienMatKhauNhapLai ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  ></i>
                </div>

                {[
                  { label: "Họ tên", name: "hoTen", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Số điện thoại", name: "soDienThoai", type: "tel" },
                ].map(({ label, name, type }) => (
                  <div className="mb-3" key={name}>
                    <label className="form-label">{label}</label>
                    <input
                      type={type}
                      className="form-control"
                      name={name}
                      value={(formData as any)[name]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}

                <div className="mb-3">
                  <label className="form-label">Giới tính</label>
                  <select
                    className="form-select"
                    name="gioiTinh"
                    value={formData.gioiTinh}
                    onChange={handleChange}
                  >
                    <option value="NAM">Nam</option>
                    <option value="NU">Nữ</option>
                    <option value="KHAC">Khác</option>
                  </select>
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="dongY"
                    checked={dongY}
                    onChange={(e) => setDongY(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="dongY">
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

                <div className="d-grid mb-2">
                  <button type="submit" className="btn btn-primary">
                    Đăng ký
                  </button>
                </div>

                <div className="text-center">
                  Đã có tài khoản?{" "}
                  <a href="/dang-nhap" className="text-decoration-underline">
                    Đăng nhập
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

export default DangKyNguoiDung;
