import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Radio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function Verification() {
  const [loading, setLoading] = useState(false);
  const [resetCode, setresetCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode,
      })
      .then(() => {
        setLoading(false);
        navigate("/e-commerce/reset-password");
      })
      .catch(({ response }) => {
        toast.error(response.data.message);
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <form
          className="form mt-5 py-4 px-3 col-12 col-md-8 col-lg-6 col-md-6 rounded-2 shadow"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Enter the Code You have just received"
            onChange={(e) => {
              setresetCode(e.target.value);
            }}
          />

          <button
            type="submit"
            className={`btn bg-main text-white mt-3 ${
              loading && "bg-main-light"
            }`}
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
              "Verify"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
