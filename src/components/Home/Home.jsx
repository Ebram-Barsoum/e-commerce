import React from "react";
import useProducts from "../../useProducts";
import Product from "../Product/product";
import Loading from "../Loading/Loading";
import { getProducts } from "../../useProducts";
import MainSlider from "../MainSlider/MainSlider";

import img1 from "../../assets/blog-img-1.jpeg";
import img2 from "../../assets/blog-img-2.jpeg";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";

export default function Home() {
  const { data, isLoading, isError, error } = useProducts(
    "products",
    getProducts
  );

  if (isLoading) return <Loading></Loading>;

  if (isError)
    return <div className="alert alert-danger mt-5">{error.message}</div>;

  return (
    <div className="" style={{ maxWidth: "100%", overflow: "hidden" }}>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <MainSlider />

      <CategorySlider />
      <div className="container my-5">
        <div className="row gy-5">
          {data?.map((product) => {
            return <Product product={product} key={product._id}></Product>;
          })}
        </div>
      </div>
    </div>
  );
}
