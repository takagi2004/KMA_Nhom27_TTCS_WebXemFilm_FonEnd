import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DangKyNguoiDung: React.FC = () => {
  const [formData, setFormData] = useState<DangKyNguoiDung>({
    hoTen: "",
    email: "",
    matKhau: "",
    soDienThoai: "",
    gioiTinh: "NAM",
  });

  const [dongYDieuKhoan, setDongYDieuKhoan] = useState(false);
  const [daDangNhap, setDaDangNhap] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded && decoded.sub) {
          setDaDangNhap(true);
        }
      } catch (error) {
        console.error("Token không hợp lệ");
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dongYDieuKhoan) {
      setMessage("Bạn phải đồng ý với điều khoản sử dụng.");
      return;
    }

    try {
      await TaiKhoanAPI.dangKyNguoiDung(formData);
      setMessage("Đăng ký thành công! Hãy đăng nhập.");
      setTimeout(() => navigate("/dang-nhap"), 2000);
    } catch (error) {
      setMessage("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  if (daDangNhap) {
    return (
      <div className="container mt-5 pt-5">
        <div className="alert alert-warning text-center">
          Bạn đã đăng nhập. Không thể đăng ký tài khoản mới.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Đăng ký tài khoản</h3>
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="hoTen" className="form-label">Họ và tên</label>
                  <input
                    type="text"
                    className="form-control"
                    id="hoTen"
                    name="hoTen"
                    value={formData.hoTen}
                    onChange={handleChange}
                    required
                    placeholder="Nhập họ tên"
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
                    placeholder="example@gmail.com"
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
                    placeholder="Nhập mật khẩu"
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
                    placeholder="0901234567"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="gioiTinh" className="form-label">Giới tính</label>
                  <select
                    className="form-select"
                    id="gioiTinh"
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
                    checked={dongYDieuKhoan}
                    onChange={(e) => setDongYDieuKhoan(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="dongY">
                    Tôi đồng ý với <a href="/dieu-khoan" target="_blank" rel="noopener noreferrer">điều khoản sử dụng</a>
                  </label>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Đăng ký</button>
                </div>
              </form>
              <div className="mt-3 text-center">
                Đã có tài khoản? <a href="/dang-nhap">Đăng nhập</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DangKyNguoiDung;
