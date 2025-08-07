// src/pages/DangKyNguoiDung.tsx
import React, { useState } from "react";
import { DangKyAPI } from "../api/DangKyAPI";

interface FormData {
  hoTen: string;
  email: string;
  matKhau: string;
  soDienThoai: string;
  gioiTinh: string;
}

const DangKyNguoiDung: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    hoTen: "",
    email: "",
    matKhau: "",
    soDienThoai: "",
    gioiTinh: "Nam",
  });

  const [thongBao, setThongBao] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await DangKyAPI.dangKyNguoiDung(formData);
      setThongBao("Đăng ký thành công!");
    } catch (error) {
      console.error("Lỗi:", error);
      setThongBao("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="container mt-5 pt-4">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="card shadow-lg">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">Đăng ký tài khoản</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="hoTen" className="form-label">Họ tên</label>
                  <input
                    type="text"
                    className="form-control"
                    id="hoTen"
                    name="hoTen"
                    value={formData.hoTen}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="matKhau" className="form-label">Mật khẩu</label>
                  <input
                    type="password"
                    className="form-control"
                    id="matKhau"
                    name="matKhau"
                    value={formData.matKhau}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="soDienThoai" className="form-label">Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    id="soDienThoai"
                    name="soDienThoai"
                    value={formData.soDienThoai}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="gioiTinh" className="form-label">Giới tính</label>
                  <select
                    className="form-select"
                    id="gioiTinh"
                    name="gioiTinh"
                    value={formData.gioiTinh}
                    onChange={handleChange}
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary w-100">Đăng ký</button>
              </form>

              {thongBao && (
                <div className="alert alert-info mt-3 text-center" role="alert">
                  {thongBao}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DangKyNguoiDung;
