import React from "react";
import logo from "../../assets/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../../UserContext";
import { getCartItems, useGetCart } from "../../useCart.js";
import { getWishItems, useGetWishList } from "../../useWhishList.js";

export default function Navbar() {
  const { user, setUser, userInfo, setUserInfo } = useUserContext();
  const { data: cartData } = useGetCart(["cart"], getCartItems);
  const { data: wishData } = useGetWishList(["wishList"], getWishItems);

  const navigate = useNavigate();

  const handleLogOut = () => {
    setUser(null);
    setUserInfo(null);

    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
      <div className="container">
        <NavLink className="navbar-brand" to="">
          <img
            src={logo}
            alt="green cart image as a logo of the application "
          />
        </NavLink>
        <button
          className="navbar-toggler shadow-none "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse text-center"
          id="navbarSupportedContent"
        >
          {user && (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">
                  Categories
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/brands">
                  Brands
                </NavLink>
              </li>
            </ul>
          )}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-4">
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/wishList">
                    <i className="fa-regular fa-heart fs-3 text-dark position-relative ">
                      <span className="badge p-2 bg-main position-absolute top-0 start-100 translate-middle-y">
                        {wishData?.data?.count}
                      </span>
                    </i>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/cart">
                    <i className="fa-solid fa-cart-plus fs-4 text-dark position-relative ">
                      <span className="badge p-2 bg-main position-absolute top-0 start-100 translate-middle-y">
                        {cartData?.data?.numOfCartItems}
                      </span>
                    </i>
                  </NavLink>
                </li>
                <li className="nav-item">
                  {userInfo.name && (
                    <span className="nav-link">Hi, {userInfo.name} 👋</span>
                  )}
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link cursor-pointer"
                    onClick={handleLogOut}
                  >
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
