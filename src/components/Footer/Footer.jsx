import React from "react";
import appImage from "../../assets/footer-img1-removebg-preview.png";
import paymentImage from "../../assets/Payment-methods.png";
import style from "./footer.module.css";

export default function Footer() {
  return (
    <div className="footer bg-footer py-5">
      <div className="container">
        <div className="row">
          <h4>Get the FreahCart App</h4>
          <p>
            We will send you a link, Open it on your phone to download the app
          </p>
        </div>

        <div className="row justify-content-center ">
          <form className="row justify-content-center align-items-center gap-3">
            <div className="col-12 col-md-9 px-0">
              <input
                type="email"
                className="form-control"
                placeholder="Your Email"
              />
            </div>

            <button
              type="button"
              className={`bg-main btn text-white col-12 col-md-2 w-auto ${style.btn}`}
            >
              Share App Link
            </button>
          </form>
        </div>

        <hr />
        <div className="row justify-content-between ">
          <div className="col-12 col-md-6 d-flex flex-wrap justify-content-start align-items-center">
            <span className="me-5">Payment parteners</span>
            <img
              src={paymentImage}
              alt="image of payment methods available"
              className="w-25"
            />
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-start align-items-center ">
            <span className="me-5"> Get Deliveries with FreshCart</span>
            <img
              src={appImage}
              alt="Google play and app store that the application available on"
              className="w-25"
            />
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}
