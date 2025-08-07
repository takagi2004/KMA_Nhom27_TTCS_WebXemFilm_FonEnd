// src/pages/DangNhap.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DangNhapModel } from "../model/DangNhapModel";
import { DangNhapAPI } from "../api/LoginAPI";

const DangNhap: React.FC = () => {
  const [formData, setFormData] = useState<DangNhapModel>({
    tenDangNhap: "",
    matKhau: "",
  });
  const [thongBao, setThongBao] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
        const data = await DangNhapAPI.dangNhap(formData);

        // ✅ GỌI HÀM TÁI SỬ DỤNG
        xuLyDangNhapThanhCong(data.token, data.nguoiDung, navigate);

        setThongBao("🎉 Đăng nhập thành công!");
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
              {thongBao && <div className="alert alert-info text-center">{thongBao}</div>}

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

                <div className="mb-3">
                  <label className="form-label">Mật khẩu</label>
                  <input
                    type="password"
                    name="matKhau"
                    className="form-control"
                    value={formData.matKhau}
                    onChange={handleChange}
                    required
                  />
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
