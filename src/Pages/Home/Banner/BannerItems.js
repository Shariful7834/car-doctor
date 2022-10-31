import React from "react";
import "./Banner.css";
const BannerItems = ({ slide }) => {
  const { image, id, prev, next } = slide;
  return (
    <div id={`slide${id}`} className="carousel-item relative w-full">
      <div className="carousel-img ">
        <img src={image} alt="" className="w-full rounded-xl" />
      </div>
      <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
        <a href={`#slide${prev}`} className="btn btn-circle mr-5">
          ❮
        </a>
        <a href={`#slide${next}`} className="btn btn-circle ">
          ❯
        </a>
      </div>
      <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/4">
        <h1 className="text-6xl font-bold text-white">
          {" "}
          Affordable <br /> Price for Car <br /> Servicing
        </h1>
      </div>
      <div className="absolute flex justify-end transform -translate-y-1/2 left-24 w-2/5 top-1/2">
        <p className="text-x text-white">
          {" "}
          There is a logs of serving opportunitiy available, but the immidaite
          serviceing is alternation of the Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Explicabo, aut.
        </p>
      </div>
      <div className="absolute flex justify-start transform -translate-y-1/2 left-24 w-2/5 top-3/4">
        <p className="text-x text-white">
          <button className="btn btn-warning mr-3">Appointment</button>
          <button className="btn btn-outline btn-warning">Interedted</button>
        </p>
      </div>
    </div>
  );
};

export default BannerItems;
