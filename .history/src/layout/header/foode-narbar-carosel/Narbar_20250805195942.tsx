import React, { useEffect, useState } from "react";
import "./../../App.css";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  // Theo dõi sự kiện scroll để đổi trạng thái navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          <form className="d-flex me-3">
            <input
              className="form-control form-control-sm me-2"
              type="search"
              placeholder="Tìm phim..."
            />
            <button className="btn btn-sm btn-warning" type="submit">
              Tìm
            </button>
          </form>

          {/* Icon user */}
          <a className="btn btn-outline-light btn-sm">Đăng nhập</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;