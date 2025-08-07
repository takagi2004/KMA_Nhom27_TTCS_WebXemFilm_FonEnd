import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../../App.css";

interface User {
  hoTen: string;
  avata?: string;
  // Bạn thêm trường khác nếu muốn
}

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra xem đã đăng nhập chưa, lấy user từ localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }

    // Lắng nghe scroll
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
    navigate("/dang-nhap");
  };

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
            <li className="nav-item"><a className="nav-link active" href="/">Trang chủ</a></li>
            <li className="nav-item"><a className="nav-link" href="/phim-le">Phim lẻ</a></li>
            <li className="nav-item"><a className="nav-link" href="/phim-bo">Phim bộ</a></li>
            <li className="nav-item"><a className="nav-link" href="/the-loai">Thể loại</a></li>
            <li className="nav-item"><a className="nav-link" href="/top-imdb">Top IMDB</a></li>
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

          {/* User / Login button */}
          {user ? (
            <div className="d-flex align-items-center">
              {user.avata && (
                <img
                  src={user.avata}
                  alt="Avatar"
                  style={{ width: 32, height: 32, borderRadius: "50%", marginRight: 8 }}
                />
              )}
              <span className="text-light me-3">{user.hoTen}</span>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
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
