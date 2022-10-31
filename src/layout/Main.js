import React from "react";
import Footer from "../Pages/Shared/Footer/Footer";

import { Outlet } from "react-router-dom";
import Header from "../Pages/Shared/Header/Header";
const Main = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
