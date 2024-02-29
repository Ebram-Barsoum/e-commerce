import React from "react";
import Slider from "react-slick";
import style from "./mainSlider.module.css";

import slide1 from "../../assets/slider-image-1.jpeg";
import slide2 from "../../assets/slider-image-2.jpeg";
import slide3 from "../../assets/slider-image-3.jpeg";

export default function MainSlider() {
  const settings = {
    dots: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="row m-0">
      <div className="col-12 p-0">
        <div className={`${style.sliderContainer}`}>
          <Slider {...settings}>
            <img src={slide1} alt="" className="w-100" height={500} />
            <img src={slide2} alt="" className="w-100" height={500} />
            <img src={slide3} alt="" className="w-100" height={500} />
          </Slider>
        </div>
      </div>
    </div>
  );
}
