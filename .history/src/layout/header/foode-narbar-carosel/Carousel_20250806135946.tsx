import React from "react";
import "./../../../App.css";

const Carousel: React.FC = () => {
  return (
    <div id="movieCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
      <div className="carousel-inner">

        {/* Slide 1 */}
        <div className="carousel-item active">
          <img src="https://image.tmdb.org/t/p/original/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg" 
               className="d-block w-100 carousel-img" alt="Avatar" />
          {/* <div className="carousel-caption d-none d-md-block">
            <h3>Avatar: The Way of Water</h3>
            <p>Trở lại thế giới Pandora đầy kỳ ảo!</p>
            <a href="/phim/avatar" className="btn btn-warning btn-sm">Xem ngay</a>
          </div> */}
        </div>

        {/* Slide 2 */}
        <div className="carousel-item">
          <img src="https://image.tmdb.org/t/p/original/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg" 
               className="d-block w-100 carousel-img" alt="Black Panther" />
          {/* <div className="carousel-caption d-none d-md-block">
            <h3>Black Panther: Wakanda Forever</h3>
            <p>Bảo vệ Wakanda trước hiểm họa mới</p>
            <a href="/phim/black-panther" className="btn btn-warning btn-sm">Xem ngay</a>
          </div> */}
        </div>

      </div>

      {/* Nút điều hướng */}
      <button className="carousel-control-prev" type="button" data-bs-target="#movieCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#movieCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
};

export default Carousel;
