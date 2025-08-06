import React from "react";
import Navbar from "./foode-narbar-carosel/Narbar";
import Carousel from "./foode-narbar-carosel/Carousel";
import DanhSachPhim from "../danhsachphim/DanhSachPhim";

const Header: React.FC = () => {
  return (
    <header>
      <Navbar />
      <Carousel />
      <DanhSachPhim />
    </header>
  );
};

export default Header;
