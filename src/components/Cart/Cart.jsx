import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  getCartItems,
  useGetCart,
  deleteCartItem,
  updateCartItemCount,
  clearCart,
  useCart,
  cartCheckOut,
} from "../../useCart";
import Loading from "../Loading/Loading";
import emptyCartImage from "../../assets/emptyCart.jpg";
import style from "./cart.module.css";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { clear } from "@testing-library/user-event/dist/clear";

export default function Cart() {
  const { data, isLoading, isError, error } = useGetCart(
    ["cart"],
    getCartItems
  );

  const { mutate: clearCartMutation } = useCart(clearCart);
  const products = data?.data?.data?.products;

  if (isLoading) return <Loading></Loading>;

  if (isError) {
    toast.error(error.message);
    return (
      <div className="container d-flex flex-column align-items-center justify-content-center  py-5">
        <h2 className="fw-bold text-main ">Empty Cart</h2>
        <img
          src={emptyCartImage}
          alt=""
          className={`w-50 ${style.emptyCart}`}
        />
      </div>
    );
  }

  if (data?.data?.numOfCartItems) {
    return (
      <div className={`container py-5 ${style.cart} my-5`}>
        <Helmet>
          <title>Cart</title>
          <meta name="description" content="Helmet application" />
        </Helmet>
        <h2 className="fw-bold">
          <i className="fa-solid fa-cart-plus"></i> My Cart
        </h2>
        <h2 className="fs-4 mt-5 fw-bold">
          Number of cart items is {data.data.numOfCartItems}
        </h2>
        <p className="text-main fw-bold mt-3">
          Total Cart Price is {data.data.data.totalCartPrice} EGP
        </p>
        <div className="row gy-3 mt-5">
          {products.map((item) => {
            return <CartItem item={item} key={item._id} />;
          })}
        </div>

        <div className="actions d-flex gap-3">
          <DetailModal cartId={data?.data?.data._id} />
          <Button
            sx={{
              backgroundColor: "#dc3545",
              color: "white",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
            onClick={clearCartMutation}
          >
            {" "}
            <i class="fa-regular fa-trash-can me-2"></i>Clear Cart
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container d-flex flex-column align-items-center justify-content-center  py-5">
        <h2 className="fw-bold text-main ">Empty Cart</h2>
        <img
          src={emptyCartImage}
          alt=""
          className={`w-50 ${style.emptyCart}`}
        />
      </div>
    );
  }
}

function CartItem({ item }) {
  const {
    mutate: mutateDelete,
    data,
    isError,
    error,
    isLoading,
  } = useCart(deleteCartItem);

  const { mutate: mutateUpdate } = useCart(updateCartItemCount);

  console.log(data);

  const handleDeleteItem = (id) => {
    mutateDelete(id);
  };

  return (
    <div className="row m-0 gy-3 p-2 align-items-center">
      <div className="image col-6 col-sm-2">
        <img
          src={item.product.imageCover}
          alt={item.product.title}
          className="w-100"
        />
      </div>

      <div className="info d-flex flex-column gap-2 col-12 col-sm-8">
        <p className="">{item.product.title}</p>
        <p className="fw-bold text-main">{item.price} EGP</p>
        <button
          className="btn ps-0 border-0 me-auto"
          onClick={() => {
            handleDeleteItem(item.product._id);
          }}
        >
          <i className="fa-solid fa-trash-can me-2 text-danger"> </i>Remove
        </button>
      </div>

      <div className="count d-flex align-items-center col-12 col-sm-2 gap-1">
        <button className="btn border border-success h-auto d-block fw-bold px-2 py-1">
          -
        </button>
        <span className="count fw-bold mx-1">{item.count}</span>
        <button
          className="btn border border-success h-auto d-block fw-bold px-2 py-1"
          onClick={() => {
            if (item.count + 1 > item.quantity) return;
            mutateUpdate({
              productId: item.product._id,
              count: item.count + 1,
            });
          }}
        >
          +
        </button>
      </div>

      <hr />
    </div>
  );
}

const settings = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function DetailModal({ cartId }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const { mutate, data } = useCart(cartCheckOut);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ cartId, shippingAddress: { name, phone, address } });

    if (data?.data.status === "success") {
      window.location.href = data.data.session.url;
    }
    //console.log(data?.data);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          backgroundColor: "#0aad0a",
          color: "white",
          "&:hover": {
            backgroundColor: "darkgreen",
          },
        }}
      >
        {" "}
        <i class="fa-solid fa-dollar-sign me-2"></i>CheckOut
      </Button>

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={settings}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              SHIPPING DETAILS
            </Typography>
            <TextField
              id="name"
              label="name"
              variant="outlined"
              sx={{ width: "100%", marginTop: "10px" }}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <TextField
              id="phone"
              label="Phone"
              variant="outlined"
              sx={{
                width: "100%",
                marginTop: "10px",
                "& input:focus": {
                  borderColor: "#0aad0a",
                },
              }}
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
            <TextField
              id="Address"
              label="Address"
              variant="outlined"
              sx={{ width: "100%", marginTop: "10px" }}
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />

            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#0aad0a",
                marginTop: "15px",
                color: "white",
                "&:hover": {
                  backgroundColor: "darkgreen",
                },
              }}
            >
              Next
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
