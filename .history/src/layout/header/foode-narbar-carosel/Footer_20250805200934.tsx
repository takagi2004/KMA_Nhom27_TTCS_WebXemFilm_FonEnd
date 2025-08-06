import React from "react";

/**
 * Footer cho trang web xem phim
 * - Responsive đầy đủ (mobile, tablet, desktop)
 * - Có phần mạng xã hội + liên hệ + link nhanh
 * - Thiết kế nền tối phù hợp trang xem phim
 */
const Footer: React.FC = () => {
  return (
    <footer className="text-center text-lg-start text-muted" style={{ backgroundColor: "#111" }}>
      {/* ====================== MẠNG XÃ HỘI ====================== */}
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        {/* Bên trái - chỉ hiện trên màn hình lớn */}
        <div className="me-5 d-none d-lg-block text-light">
          <span>Kết nối với chúng tôi trên mạng xã hội:</span>
        </div>

        {/* Bên phải - icon mạng xã hội */}
        <div>
          <a href="#" className="me-4 text-reset text-light"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="me-4 text-reset text-light"><i className="fab fa-twitter"></i></a>
          <a href="#" className="me-4 text-reset text-light"><i className="fab fa-google"></i></a>
          <a href="#" className="me-4 text-reset text-light"><i className="fab fa-instagram"></i></a>
          <a href="#" className="me-4 text-reset text-light"><i className="fab fa-linkedin"></i></a>
          <a href="#" className="me-4 text-reset text-light"><i className="fab fa-github"></i></a>
        </div>
      </section>

      {/* ====================== LIÊN KẾT NHANH ====================== */}
      <section>
        <div className="container text-center text-md-start mt-5 text-light">
          <div className="row mt-3">
            {/* Cột 1 - Giới thiệu */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>KMA Movie
              </h6>
              <p>
                Trang web xem phim trực tuyến chất lượng cao.  
                Thưởng thức kho phim đa dạng, cập nhật liên tục và hoàn toàn miễn phí.
              </p>
            </div>

            {/* Cột 2 - Thể loại */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Thể loại</h6>
              <p><a href="#" className="text-reset">Hành động</a></p>
              <p><a href="#" className="text-reset">Tình cảm</a></p>
              <p><a href="#" className="text-reset">Kinh dị</a></p>
              <p><a href="#" className="text-reset">Hoạt hình</a></p>
            </div>

            {/* Cột 3 - Liên kết hữu ích */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Liên kết</h6>
              <p><a href="#" className="text-reset">Trang chủ</a></p>
              <p><a href="#" className="text-reset">Phim mới</a></p>
              <p><a href="#" className="text-reset">Top 10</a></p>
              <p><a href="#" className="text-reset">Hỗ trợ</a></p>
            </div>

            {/* Cột 4 - Liên hệ */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Liên hệ</h6>
              <p><i className="fas fa-home me-3"></i> Hà Nội, Việt Nam</p>
              <p><i className="fas fa-envelope me-3"></i> support@kmamovie.vn</p>
              <p><i className="fas fa-phone me-3"></i> +84 123 456 789</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== COPYRIGHT ====================== */}
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", color: "#fff" }}
      >
        © 2025 Bản quyền thuộc về <strong>KMA Movie</strong>
      </div>
    </footer>
  );
};

export default Footer;
