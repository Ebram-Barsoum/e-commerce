import React from "react";
import { useParams } from "react-router-dom";
import useProducts, { getProductDetails } from "../../useProducts";
import Loading from "../Loading/Loading";
import Slider from "react-slick";
import { useCart } from "../../useCart";
import { addToCart } from "../../useCart";
import style from "./productDetails.module.css";

export default function ProductDetails() {
  const { id } = useParams();
  const { mutate } = useCart(addToCart);

  const { data, isLoading, isError, error } = useProducts(["details"], () =>
    getProductDetails(id)
  );

  console.log(data);
  if (isLoading) return <Loading></Loading>;

  if (isError)
    return <div className="alert alert-danger mt-5">{error.message}</div>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="container py-5">
      <div className="row gy-5">
        <div className="col-12 col-md-4">
          <div className={`${style.sliderContainer}`}>
            <Slider {...settings}>
              <img
                src={data.imageCover}
                alt={data.description}
                className="w-100"
                height={300}
              />

              {data.images.map((img) => (
                <img
                  src={img}
                  alt={data.description}
                  className="w-100"
                  height={300}
                />
              ))}
            </Slider>
          </div>
        </div>

        <div className="col-12 col-md-8 d-flex flex-column gap-3 justify-content-center ">
          <h2 className="title text-main fs-4">{data.title}</h2>
          <p className="text-muted">{data.description}</p>
          <span className="fw-bold">{data.category.name}</span>

          <div className="box d-flex gap-5">
            <div className="price fw-bold">{data.price} EGP</div>
            <div className="rating">
              <i className="fa-solid fa-star rating-color me-1"></i>
              {data.ratingsAverage}
            </div>
          </div>

          <button
            className="btn bg-main text-white h-auto d-block"
            onClick={() => {
              mutate(id);
            }}
          >
            <i class="fa-solid fa-cart-shopping"></i> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
