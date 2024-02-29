import React from "react";
import style from "./wishList.module.css";
import {
  deleteWishItem,
  getWishItems,
  useGetWishList,
  useWhishList,
} from "../../useWhishList";
import emptyCartImage from "../../assets/emptyCart.jpg";
import { addToCart, useCart } from "../../useCart";

import Loading from "../Loading/Loading";

export default function WishList() {
  const { data, isError, isLoading, error } = useGetWishList(
    ["wishList"],
    getWishItems
  );

  if (isLoading) return <Loading></Loading>;

  if (isError)
    return <div className="container my-5 py-5">{error.message}</div>;

  //console.log(data?.data);
  const products = data?.data?.data;

  if (products.length === 0) {
    return (
      <div className="container d-flex flex-column align-items-center justify-content-center  py-5">
        <h2 className="fw-bold text-main f">Empty Wish List</h2>
        <img
          src={emptyCartImage}
          alt="Empty Shopping Cart"
          className={`w-50 ${style.emptyCart}`}
        />
      </div>
    );
  }

  return (
    <div className={`container my-5 py-5 ${style.wishList}`}>
      {products?.map((product) => {
        return <WishItem product={product} key={product._id} />;
      })}
    </div>
  );
}

function WishItem({ product }) {
  const { mutate: mutateDeleteWish } = useWhishList(deleteWishItem);
  const { mutate: mutateAddToCart } = useCart(addToCart);

  return (
    <div className="row align-items-center gy-3 p-2 ">
      <div className="col-6 col-sm-2">
        <img src={product.imageCover} alt={product.title} className="w-100" />
      </div>

      <div className="info d-flex flex-column gap-2 col-12 col-sm-6">
        <div className="title">{product.title}</div>
        <div className="price text-main fw-bold">{product.price} EGP</div>
        <button
          className="btn border-0 ps-0 me-auto text-danger"
          onClick={() => {
            mutateDeleteWish(product._id);
          }}
        >
          <i className="fa-solid fa-trash-can me-2 "></i>
          Remove
        </button>
      </div>

      <button
        className="btn  bg-main text-white w-auto d-block font-sm"
        onClick={() => {
          mutateAddToCart(product._id);
          mutateDeleteWish(product._id);
        }}
      >
        <i className="fa-solid fa-cart-plus me-2"></i>
        Add to cart
      </button>
      <hr />
    </div>
  );
}
