import React from "react";
import Navbar from "./Navbar";
import Carousel from "./Carousel";

const Header: React.FC = () => {
  return (
    <header>
      <Navbar />
      <Carousel />
    </header>
  );
};

export default Header;
