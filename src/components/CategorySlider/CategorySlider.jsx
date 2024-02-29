import { getCategories, useCategories } from "../../useCategories";
import style from "./categorySlider.module.css";

import Loading from "../Loading/Loading";
import Slider from "react-slick";

export default function CategorySlider() {
  const { data, isLoading, isError, error } = useCategories(
    ["categories"],
    getCategories
  );

  if (isLoading) return <Loading></Loading>;

  if (isError)
    return <div className="alert alert-danger py-5 my-4">{error.message}</div>;

  const settings = {
    dots: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    speed: 500,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  console.log(data);
  return (
    <div className="row my-5">
      <div className="col-12">
        <div className={`${style.sliderContainer}`}>
          <Slider {...settings}>
            {data?.data?.data.map((category) => {
              return (
                <div className="cat">
                  <img
                    src={category.image}
                    alt=""
                    className="w-100"
                    height={200}
                  />
                  <h2 className="fs-6 fw-bold text-center mt-2 text-main">
                    {category.name}
                  </h2>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}
