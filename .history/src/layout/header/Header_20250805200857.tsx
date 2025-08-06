import React from "react";
import Navbar from "./foode-narbar-carosel/Narbar";
import Carousel from "./foode-narbar-carosel/Carousel";

const Header: React.FC = () => {
  return (
    <header>
      <Navbar />
      <Carousel />
    </header>
  );
};

export default Header;
