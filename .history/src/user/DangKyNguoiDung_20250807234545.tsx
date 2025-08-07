import React, { useState } from "react";
import './DangKyNguoiDung.css'; // <-- chứa CSS đẹp bạn gửi
import { DangKyModel } from "../model/DangKyModel";
import { DangKyAPI } from "../api/DangKyAPI";

const DangKyNguoiDung: React.FC = () => {
  const [form, setForm] = useState<DangKyModel>({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDienThoai: "",
    gioiTinh: "NAM",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await DangKyAPI.dangKyTaiKhoan(form);
      alert("Đăng ký thành công!");
    } catch (err: any) {
      alert("Lỗi: " + err);
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card py-3 px-2">
            <p className="text-center mb-3 mt-2">ĐĂNG KÝ TÀI KHOẢN</p>
            <div className="division">
              <div className="row">
                <div className="col-3"><div className="line l"></div></div>
                <div className="col-6"><span>NHẬP THÔNG TIN</span></div>
                <div className="col-3"><div className="line r"></div></div>
              </div>
            </div>
            <form className="myform" onSubmit={handleSubmit}>
              <input
                name="taiKhoan"
                value={form.taiKhoan}
                onChange={handleChange}
                className="form-control"
                placeholder="Tài khoản"
                required
              />
              <input
                name="matKhau"
                type="password"
                value={form.matKhau}
                onChange={handleChange}
                className="form-control"
                placeholder="Mật khẩu"
                required
              />
              <input
                name="hoTen"
                value={form.hoTen}
                onChange={handleChange}
                className="form-control"
                placeholder="Họ tên"
                required
              />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Email"
                required
              />
              <input
                name="soDienThoai"
                value={form.soDienThoai}
                onChange={handleChange}
                className="form-control"
                placeholder="Số điện thoại"
                required
              />
              <select
                name="gioiTinh"
                value={form.gioiTinh}
                onChange={handleChange}
                className="form-control"
              >
                <option value="NAM">Nam</option>
                <option value="NU">Nữ</option>
                <option value="KHAC">Khác</option>
              </select>
              <div className="form-group mt-3">
                <button type="submit" className="btn btn-block btn-primary btn-lg">
                  <small><i className="far fa-user pr-2"></i>Đăng ký</small>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DangKyNguoiDung;
