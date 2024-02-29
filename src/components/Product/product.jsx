import style from "./products.module.css";
import { Link } from "react-router-dom";
import { addToCart, useCart } from "../../useCart";
import {
  addToWish,
  useWhishList,
  useGetWishList,
  getWishItems,
} from "../../useWhishList";
import toast from "react-hot-toast";

export default function Product({ product }) {
  const { mutate: mutateCart } = useCart(addToCart);
  const { mutate: mutateWish } = useWhishList(addToWish);
  const { data } = useGetWishList(["wishList"], getWishItems);
  const wishList = data?.data?.data;

  let isWished = false;
  if (localStorage.getItem("userToken")) {
    wishList?.map((item) => {
      if (item._id === product._id) isWished = true;
    });
  }

  return (
    <div className="col-6 col-md-4 col-lg-3 col-xl-2  px-3">
      <div
        className={`product rounded-2 overflow-hidden cursor-pointer ${style.product} border-none`}
      >
        <Link to={`/e-commerce/productDetails/${product._id}`}>
          <img
            src={product.imageCover}
            alt={product.description}
            className={`w-100 ${style.image}`}
          />

          <div className="text p-2">
            <h2 className="fs-6 text-main">{product.category.name}</h2>
            <p className={`font-sm ${style.title}`}>{product.title}</p>
            <div className="d-flex justify-content-between ">
              <span className="price">{product.price} EGP</span>
              <span className="">
                <i className="fa-solid fa-star rating-color me-1"></i>
                {product.ratingsAverage}
              </span>
            </div>
          </div>
        </Link>

        <button
          className="btn bg-main text-white m-2 font-sm from-control "
          onClick={() => {
            if (!localStorage.getItem("userToken")) {
              toast.error("Login first");
              return;
            }
            mutateCart(product._id);
          }}
        >
          <i className="fa-solid fa-cart-shopping me-2"></i>
          Add to cart
        </button>
        <i
          class={`${isWished ? "fa-solid text-main" : "fa-regular"} fa-heart ${
            style.heart
          }`}
          onClick={() => {
            if (!localStorage.getItem("userToken")) {
              toast.error("Login first");
              return;
            }
            mutateWish(product._id);
          }}
        ></i>
      </div>
    </div>
  );
}
