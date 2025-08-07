import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DangKyAPI } from "../api/DangKyAPI";

const DangKyNguoiDung: React.FC = () => {
  const [taiKhoan, setTaiKhoan] = useState("");
  const [hoTen, setHoTen] = useState("");
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");
  const [gioiTinh, setGioiTinh] = useState<"NAM" | "NU" | "KHAC">("NAM");

  const navigate = useNavigate();

  const handleDangKy = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        taiKhoan,
        hoTen,
        email,
        matKhau,
        soDienThoai,
        gioiTinh,
      };
      await DangKyAPI.dangKyTaiKhoan(data);
      alert("Đăng ký thành công!");
      navigate("/dang-nhap");
    } catch (error) {
      alert("Đăng ký thất bại! Tài khoản hoặc email đã tồn tại?");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <h3 className="card-title text-center mb-4">Đăng ký tài khoản</h3>
              <form onSubmit={handleDangKy}>
                <div className="mb-3">
                  <label className="form-label">Tên tài khoản</label>
                  <input
                    type="text"
                    className="form-control"
                    value={taiKhoan}
                    onChange={(e) => setTaiKhoan(e.target.value)}
                    required
                    placeholder="Nhập tên tài khoản..."
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Họ tên</label>
                  <input
                    type="text"
                    className="form-control"
                    value={hoTen}
                    onChange={(e) => setHoTen(e.target.value)}
                    required
                    placeholder="Nhập họ tên..."
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Nhập email..."
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Mật khẩu</label>
                  <input
                    type="password"
                    className="form-control"
                    value={matKhau}
                    onChange={(e) => setMatKhau(e.target.value)}
                    required
                    placeholder="Nhập mật khẩu..."
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    value={soDienThoai}
                    onChange={(e) => setSoDienThoai(e.target.value)}
                    placeholder="Nhập số điện thoại..."
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Giới tính</label>
                  <select
                    className="form-select"
                    value={gioiTinh}
                    onChange={(e) => setGioiTinh(e.target.value as "NAM" | "NU" | "KHAC")}
                  >
                    <option value="NAM">Nam</option>
                    <option value="NU">Nữ</option>
                    <option value="KHAC">Khác</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Đăng ký
                </button>
              </form>
              <p className="text-center mt-3">
                Đã có tài khoản?{" "}
                <a href="/dang-nhap" className="text-decoration-none">
                  Đăng nhập
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DangKyNguoiDung;
