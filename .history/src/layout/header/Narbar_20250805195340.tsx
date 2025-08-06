import React from "react";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand fw-bold text-warning" href="/">
          🎬 KMA Movie
        </a>

        {/* Nút menu mobile */}
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

        {/* Menu chính */}
        <div className="collapse navbar-collapse" id="navbarMovie">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link active" href="/">Trang chủ</a></li>
            <li className="nav-item"><a className="nav-link" href="/phim-le">Phim lẻ</a></li>
            <li className="nav-item"><a className="nav-link" href="/phim-bo">Phim bộ</a></li>
            <li className="nav-item"><a className="nav-link" href="/the-loai">Thể loại</a></li>
            <li className="nav-item"><a className="nav-link" href="/top-imdb">Top IMDB</a></li>
          </ul>

          {/* Thanh tìm kiếm */}
          <form className="d-flex me-3">
            <input
              className="form-control form-control-sm me-2"
              type="search"
              placeholder="Tìm phim..."
              aria-label="Search"
            />
            <button className="btn btn-sm btn-warning" type="submit">Tìm</button>
          </form>

          {/* Icon user */}
          <a className="btn btn-outline-light btn-sm">Đăng nhập</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
