import React from "react";
import Navbar from "./narbar-hender_fooder/Narbar";
import Carousel from "./narbar-hender_fooder/Carousel";

const Header: React.FC = () => {
  return (
    <header>
      <Navbar />
      <Carousel />
    </header>
  );
};

export default Header;
