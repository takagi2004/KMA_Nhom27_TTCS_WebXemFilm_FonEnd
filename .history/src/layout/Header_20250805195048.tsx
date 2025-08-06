import React from "react";
import Navbar from "./hender/Narbar";
import Carousel from "./hender/Carousel";

const Header: React.FC = () => {
  return (
    <header>
      <Navbar />
      <Carousel />
    </header>
  );
};

export default Header;
