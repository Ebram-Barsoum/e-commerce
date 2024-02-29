import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import axios from "axios";
import { Radio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const signUpSchema = yup.object({
  name: yup
    .string()
    .required("Name is Required")
    .min(4, "Name length must be greater than 3")
    .max(20, "Name length must be less than or equal 20"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is Required")
    .matches(/^[A-Z][\Wa-z0-9]{5,10}/, "Invalid Password"),

  rePassword: yup
    .string()
    .required("Confirming password is required")
    .oneOf([yup.ref("password")], "Doesn't match the password"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^[01][0-25][0-9]{9}$/, "Invalid phone number"),
});

export default function Register(values) {
  const navigator = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function register(values) {
    setLoading(true);

    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((data) => {
        setLoading(false);
        setErrorMsg("");
        navigator("login");

        console.log(data);
      })
      .catch((response) => {
        setLoading(false);
        setErrorMsg(response.message);
        console.log(response);
      });
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: signUpSchema,
    onSubmit: () => {
      register(formik.values);
      formik.resetForm();
    },
  });

  return (
    <div className="register py-5">
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className="row py-5 justify-content-center ">
        <form
          onSubmit={formik.handleSubmit}
          className="col-11 col-md-8 form p-3 rounded-3 shadow"
        >
          <h1 className="fs-4 mb-4 fw-bold">Register Now</h1>
          {errorMsg && <p className="alert alert-danger">{errorMsg}</p>}
          <input
            type="text"
            className="form-control mb-3"
            name="name"
            placeholder="Your Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name && (
            <p className="font-sm text-danger ps-3">
              {"*" + formik.errors.name}
            </p>
          )}

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

          <input
            type="password"
            className="form-control mb-3"
            name="rePassword"
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="font-sm text-danger ps-3">
              {"*" + formik.errors.rePassword}
            </p>
          )}

          <input
            type="tel"
            className="form-control mb-3"
            name="phone"
            placeholder="Your Phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="font-sm text-danger ps-3">
              {"*" + formik.errors.phone}
            </p>
          )}

          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
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
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
