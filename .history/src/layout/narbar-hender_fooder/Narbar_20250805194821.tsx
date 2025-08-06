import React from "react";
import "./Navbar.css"; // CSS riêng cho navbar

const Navbar: React.FC = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark d-none d-lg-block"
      style={{ zIndex: 2000 }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <a
          className="navbar-brand nav-link"
          target="_blank"
          href="https://mdbootstrap.com/docs/standard/"
          rel="noreferrer"
        >
          <strong>MDB</strong>
        </a>

        {/* Nút menu mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-collapse-init
          data-mdb-target="#navbarExample01"
          aria-controls="navbarExample01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarExample01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item active">
              <a className="nav-link" aria-current="page" href="#intro">Trang chủ</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://www.youtube.com/" target="_blank" rel="noreferrer">
                Học Bootstrap 5
              </a>
            </li>
          </ul>

          {/* Icon mạng xã hội */}
          <ul className="navbar-nav list-inline">
            <li><a className="nav-link" href="https://www.youtube.com/" target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a></li>
            <li><a className="nav-link" href="https://www.facebook.com/" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
