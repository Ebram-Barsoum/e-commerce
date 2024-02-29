import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../Loading/Loading";
const token = localStorage.getItem("userToken");

export default function AllOrders() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  if (token) var { id: userId } = jwtDecode(token);
  const getOrders = () => {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
        setErrorMsg("");
      })
      .catch(({ error }) => {
        setErrorMsg(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) return <Loading />;

  if (errorMsg)
    return <div className="alert alert-danger py-5 my-5">{errorMsg}</div>;

  return (
    <div
      className="orders py-5 my-5"
      style={{ backgroundColor: "#edf6f9", padding: "20px" }}
    >
      {orders.map((order) => {
        return (
          <div className="order d-flex flex-column gap-3">
            <Order order={order} key={order._id} />
            <div className="fw-bold fst-italic ">
              Purchased at {new Date(order.paidAt).toLocaleDateString()}
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

function Order({ order }) {
  return order.cartItems.map((item) => {
    return (
      <div className="row align-items-center gy-3">
        <div className="col-12 col-sm-4 col-md-2">
          <img
            src={item.product.imageCover}
            alt={item.product.title}
            className="w-50"
          />
        </div>
        <div className="col-12 col-sm-10 d-flex flex-column gap-3">
          <div className="title text-main">{item.product.title}</div>
          <div className="price fw-bold">{item.price} EGP</div>
        </div>
      </div>
    );
  });
}
