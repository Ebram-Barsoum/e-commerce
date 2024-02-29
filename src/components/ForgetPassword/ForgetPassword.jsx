import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Radio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  const validateEmail = () => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email,
      })
      .then(({ data }) => {
        toast.success(data.message);
        setLoading(false);
        navigate("/verification");
      })
      .catch(({ response }) => {
        toast.error(response.data.message);
        setLoading(false);
        setIsValid(false);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <form
          className="form mt-5 py-4 px-3 col-11 col-md-8 col-lg-6 rounded-2 shadow"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            className="form-control"
            placeholder="Enter Your E-mail"
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail();
            }}
          />
          <button
            type="submit"
            className={`btn bg-main text-white mt-3 ${
              loading && "bg-main-light"
            }`}
            disabled={!isValid}
          >
            {loading ? (
              <Radio
                visible={true}
                height="20"
                width="65"
                color="#fff"
                ariaLabel="radio-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Send a code"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
