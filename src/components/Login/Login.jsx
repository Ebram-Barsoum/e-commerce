import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Radio } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../UserContext";
import { Helmet } from "react-helmet";

const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is Required")
    .matches(/^[A-Z][\Wa-z0-9]{5,10}/, "Invalid Password"),
});

export default function Login() {
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { user, setUser, userInfo, setUserInfo } = useUserContext();

  function login(values) {
    setLoading(true);

    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(({ data }) => {
        setLoading(false);
        setErrorMsg("");

        setUser(data.taken);
        setUserInfo(data.user);
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        navigator("/home");
      })
      .catch(({ response }) => {
        setLoading(false);
        setErrorMsg(response.data.message);
      });
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: () => {
      login(formik.values);
      formik.resetForm();
    },
  });
  return (
    <div className="register py-5">
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Helmet application" />
      </Helmet>

      <div className="row py-5 justify-content-center ">
        <form
          onSubmit={formik.handleSubmit}
          className="col-11 col-md-8 form p-3 rounded-3 shadow "
        >
          <h1 className="fs-4 mb-4 fw-bold">Login</h1>
          {errorMsg && <p className="alert alert-danger">{errorMsg}</p>}

          <input
            type="email"
            className="form-control mb-3"
            name="email"
            placeholder="Your Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="font-sm text-danger ps-3">
              {"*" + formik.errors.email}
            </p>
          )}

          <input
            type="password"
            className="form-control mb-3"
            name="password"
            placeholder="Your Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="font-sm text-danger ps-3">
              {"*" + formik.errors.password}
            </p>
          )}

          <Link className="font-sm link" to={"/forget-password"}>
            Forget Password?
          </Link>
          <button
            type="submit"
            disabled={!(formik.dirty && formik.isValid)}
            className={`btn ms-auto d-block bg-main text-white ${
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
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
