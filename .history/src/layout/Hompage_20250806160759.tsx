import DanhSachPhim from "./danhsachphim/DanhSachPhim";
import Footer from "./header/foode-narbar-carosel/Footer";
import Header from "./header/Header";
import React from "react";
function Hompage() {
  return (
    <div className="App">
       <Header />
       <DanhSachPhim />
       <Footer />
    </div>
  );
}

export default Hompage;