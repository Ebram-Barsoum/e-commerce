import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

export default function AllOrders() {
  const token = localStorage.getItem("userToken");
  if (token) var { id: userId } = jwtDecode(token);

  const getOrders = () => {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  if (isLoading) return <Loading />;

  if (isError)
    return <div className="alert alert-danger py-5 my-5">{error.message}</div>;

  console.log(data);
  return (
    <div
      className="orders py-5 my-5"
      style={{ backgroundColor: "#edf6f9", padding: "20px" }}
    >
      {data?.data?.map((order) => {
        return (
          <div className="order d-flex flex-column gap-3" key={order._id}>
            <Order order={order} />
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
  return order?.cartItems.map((item) => {
    return (
      <div className="row align-items-center gy-3" key={item._id}>
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
