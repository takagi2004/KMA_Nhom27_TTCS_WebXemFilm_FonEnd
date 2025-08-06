import React from "react";
im
// Component NavBar hiển thị thanh điều hướng + carousel
// Responsive tự động nhờ class của Bootstrap
function NavBar() {
  return (
    <header>
      {/* ====================== THANH NAVBAR ====================== */}
      <nav
        className="navbar navbar-expand-lg navbar-dark d-none d-lg-block"
        style={{ zIndex: 2000 }}
      >
        <div className="container-fluid">
          {/* Logo / Brand */}
          <a
            className="navbar-brand nav-link"
            target="_blank"
            href="https://mdbootstrap.com/docs/standard/"
            rel="noreferrer"
          >
            <strong>MDB</strong>
          </a>

          {/* Nút hiện menu khi màn hình nhỏ (Mobile) */}
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

          {/* Menu chính */}
          <div className="collapse navbar-collapse" id="navbarExample01">
            {/* Danh sách menu bên trái */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item active">
                <a className="nav-link" aria-current="page" href="#intro">
                  Trang chủ
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://www.youtube.com/channel/UC5CF7mLQZhvx8O5GODZAhdA"
                  rel="noreferrer"
                  target="_blank"
                >
                  Học Bootstrap 5
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://mdbootstrap.com/docs/standard/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Tải MDB UI KIT
                </a>
              </li>
            </ul>

            {/* Icon mạng xã hội bên phải */}
            <ul className="navbar-nav list-inline">
              <li>
                <a
                  className="nav-link"
                  href="https://www.youtube.com/channel/UC5CF7mLQZhvx8O5GODZAhdA"
                  rel="noreferrer"
                  target="_blank"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </li>
              <li>
                <a
                  className="nav-link"
                  href="https://www.facebook.com/mdbootstrap"
                  rel="noreferrer"
                  target="_blank"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://twitter.com/MDBootstrap"
                  rel="noreferrer"
                  target="_blank"
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://github.com/mdbootstrap/mdb-ui-kit"
                  rel="noreferrer"
                  target="_blank"
                >
                  <i className="fab fa-github"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* ====================== HẾT NAVBAR ====================== */}

      {/* ====================== CAROUSEL ====================== */}
      <div
        id="introCarousel"
        className="carousel slide carousel-fade shadow-2-strong"
        data-mdb-ride="carousel"
        data-mdb-carousel-init
      >
        {/* Nút chấm nhỏ (Indicators) */}
        <div className="carousel-indicators">
          <button data-mdb-target="#introCarousel" data-mdb-slide-to="0" className="active"></button>
          <button data-mdb-target="#introCarousel" data-mdb-slide-to="1"></button>
          <button data-mdb-target="#introCarousel" data-mdb-slide-to="2"></button>
        </div>

        {/* Nội dung slide */}
        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item active">
            <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="text-white text-center" data-mdb-theme="dark">
                  <h1 className="mb-3">Học Bootstrap 5 với MDB</h1>
                  <h5 className="mb-4">Hướng dẫn thiết kế web responsive miễn phí</h5>
                  <a
                    className="btn btn-outline-light btn-lg m-2"
                    href="https://www.youtube.com/watch?v=c9B4TPnak1A"
                    role="button"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Bắt đầu học
                  </a>
                  <a
                    className="btn btn-outline-light btn-lg m-2"
                    href="https://mdbootstrap.com/docs/standard/"
                    target="_blank"
                    rel="noreferrer"
                    role="button"
                  >
                    Tải MDB UI KIT
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="text-white text-center">
                  <h2>Bạn có thể đặt bất kỳ nội dung gì ở đây</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item">
            <div
              className="mask"
              style={{
                background: "linear-gradient(45deg, rgba(29, 236, 197, 0.7), rgba(91, 14, 214, 0.7) 100%)",
              }}
            >
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="text-white text-center">
                  <h2>Hoặc che bằng bất kỳ mask nào</h2>
                  <a
                    className="btn btn-outline-light btn-lg m-2"
                    href="https://mdbootstrap.com/docs/standard/content-styles/masks/"
                    target="_blank"
                    rel="noreferrer"
                    role="button"
                  >
                    Tìm hiểu thêm về mask
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nút điều hướng trái/phải */}
        <a className="carousel-control-prev" href="#introCarousel" role="button" data-mdb-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#introCarousel" role="button" data-mdb-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      {/* ====================== HẾT CAROUSEL ====================== */}
    </header>
  );
}

export default NavBar;
