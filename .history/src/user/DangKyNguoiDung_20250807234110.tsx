import React, { useState } from "react";
import { DangKyAPI } from "../api/DangKyAPI";
import { DangKyRequest } from "../model/DangKyRequest";

const DangKyNguoiDung: React.FC = () => {
  const [form, setForm] = useState<DangKyRequest>({
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
      // Điều hướng sang trang đăng nhập, v.v.
    } catch (err: any) {
      alert("Lỗi: " + err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="taiKhoan" value={form.taiKhoan} onChange={handleChange} placeholder="Tài khoản" required />
      <input name="matKhau" type="password" value={form.matKhau} onChange={handleChange} placeholder="Mật khẩu" required />
      <input name="hoTen" value={form.hoTen} onChange={handleChange} placeholder="Họ tên" required />
      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="soDienThoai" value={form.soDienThoai} onChange={handleChange} placeholder="Số điện thoại" required />
      <select name="gioiTinh" value={form.gioiTinh} onChange={handleChange}>
        <option value="NAM">Nam</option>
        <option value="NU">Nữ</option>
        <option value="KHAC">Khác</option>
      </select>
      <button type="submit">Đăng ký</button>
    </form>
  );
};

export default DangKyNguoiDung;
