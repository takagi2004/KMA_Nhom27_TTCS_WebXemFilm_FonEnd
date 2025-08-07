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

  const [thongBao, setThongBao] = useState<string>("");
  const [dongY, setDongY] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dongY) {
      setThongBao("❗ Bạn phải đồng ý với điều khoản sử dụng.");
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
              {thongBao && <div className="alert alert-info text-center">{thongBao}</div>}
              <form onSubmit={handleSubmit}>
                {[
                  { label: "Tên đăng nhập", name: "tenDangNhap" },
                  { label: "Mật khẩu", name: "matKhau", type: "password" },
                  { label: "Họ tên", name: "hoTen" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Số điện thoại", name: "soDienThoai" },
                ].map(({ label, name, type = "text" }) => (
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
                    <a href="/dieu-khoan" target="_blank" rel="noopener noreferrer">
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
