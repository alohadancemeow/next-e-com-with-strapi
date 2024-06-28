"use client";

import "./index.scss";
import React, { useState } from "react";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
// import useFetch from "@/hooks/use-fetch";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // fetching only new item
  // TODO: image size not fit
  // const { data, error, loading } = useFetch(
  //   `/products?filters[isNew][$eq]=true`
  // );

  const imageData = [
    "https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ];

  const prevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? imageData.length - 1 : (prev) => prev - 1
    );
  };
  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === imageData.length - 1 ? 0 : (prev) => prev + 1
    );
  };

  return (
    <div className="slider">
      <div
        className="container"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {/* {data?.map((p) => (
          <img
            key={p?.id}
            src={`${p?.attributes?.thumbnail?.url}`}
            alt={`${p?.attributes?.title}`}
          />
        ))} */}
        <img src={imageData[0]} alt="" />
        <img src={imageData[1]} alt="" />
        <img src={imageData[2]} alt="" />
      </div>
      <div className="icons">
        <div className="icon" onClick={prevSlide}>
          <WestOutlinedIcon />
        </div>
        <div className="icon" onClick={nextSlide}>
          <EastOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default Slider;
