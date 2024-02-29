import React from "react";
import { useCategories, getCategories } from "../../useCategories";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";
import style from "./categories.module.css";

export default function Categories() {
  const { data, isError, isLoading, error } = useCategories(
    ["categories"],
    getCategories
  );

  if (isLoading) return <Loading></Loading>;

  if (isError)
    return <div className="alert alert-danger py-5 my-4">{error.message}</div>;

  return (
    <div className="row py-5 gy-5 gx-3  ">
      <Helmet>
        <title>Categories</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {data?.data?.data.map((category) => (
        <Category category={category} key={category._id} />
      ))}
    </div>
  );
}

function Category({ category }) {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 px-2">
      <div
        className={`${style.category} pb-2 shadow rounded-2 border overflow-hidden cursor-pointer`}
      >
        <div className="image overflow-hidden ">
          <img
            src={category.image}
            alt={category.name}
            className="w-100"
            height={250}
          />
        </div>
        <h2 className="fs-5 fw-bold text-main text-center mt-2">
          {category.name}
        </h2>
      </div>
    </div>
  );
}
