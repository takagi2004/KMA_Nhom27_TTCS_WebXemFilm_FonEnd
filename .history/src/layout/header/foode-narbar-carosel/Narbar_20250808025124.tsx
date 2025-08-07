import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../../App.css";

export interface QuyenModel {
  idQuyen: number;
  tenQuyen: string; // ADMIN, USER, VIP_USER
}

export interface NguoiDungModel {
  idNguoiDung: number;
  hoTen: string;
  email: string;
  tenDangNhap: string;
  avata?: string;
  vaiTro: string;
  quyenList?: QuyenModel[];
}

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<NguoiDungModel | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser: NguoiDungModel = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/dang-nhap"; // Reload toàn trang
  };


  const isAdmin = user?.quyenList?.some(q => q.tenQuyen === "ADMIN");

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top px-4 ${
        scrolled ? "navbar-dark bg-dark shadow" : "navbar-dark bg-transparent"
      }`}
    >
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand fw-bold text-warning" href="/">
          🎬 KMA Movie
        </a>

        {/* Menu icon mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMovie"
          aria-controls="navbarMovie"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarMovie">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                Trang chủ
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/phim-le">
                Phim lẻ
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/phim-bo">
                Phim bộ
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/the-loai">
                Thể loại
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/top-imdb">
                Top IMDB
              </a>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <a
                  className="nav-link text-warning fw-bold"
                  href="/admin"
                >
                  Quản trị
                </a>
              </li>
            )}
          </ul>

          {/* Search */}
          <form className="d-flex me-3" onSubmit={e => e.preventDefault()}>
            <input
              className="form-control form-control-sm me-2"
              type="search"
              placeholder="Tìm phim..."
            />
            <button className="btn btn-sm btn-warning" type="submit">
              Tìm
            </button>
          </form>

          {/* User / Dropdown */}
          {user ? (
            <div className="dropdown">
              <button
                className="btn btn-outline-light btn-sm dropdown-toggle d-flex align-items-center"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user.avata ? (
                  <img
                    src={user.avata}
                    alt="Avatar"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      marginRight: 8,
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <i className="bi bi-person-circle fs-4 me-2"></i>
                )}
                <span>{user.hoTen}</span>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="userDropdown"
                style={{ minWidth: "200px" }}
              >
                <li>
                  <a
                    className="dropdown-item"
                    href="/thong-tin-tai-khoan"
                    style={{ whiteSpace: "normal" }}
                  >
                    <strong>{user.hoTen}</strong>
                    <br />
                    <small className="text-muted">Thông tin tài khoản</small>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                {isAdmin && (
                  <li>
                    <a
                      className="dropdown-item text-warning fw-bold"
                      href="/admin"
                    >
                      Quản trị
                    </a>
                  </li>
                )}
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <a href="/dang-nhap" className="btn btn-outline-light btn-sm">
              Đăng nhập
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
