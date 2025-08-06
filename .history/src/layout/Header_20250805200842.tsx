import React from "react";
import Navbar from "./header/Narbar";
import Carousel from "./header/foode-narbar-carosel/Carousel";

const Header: React.FC = () => {
  return (
    <header>
      <Navbar />
      <Carousel />
    </header>
  );
};

export default Header;
