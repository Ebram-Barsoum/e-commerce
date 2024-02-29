import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Radio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const resetSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  newPassword: yup
    .string()
    .required("Password is required")
    .matches(/^[A-Z][\Wa-z0-9]{5,10}/, "Invalid Password"),
});

export default function ResetPassword() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const resetPassword = (values) => {
    setLoading(true);
    axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then(({ data }) => {
        setLoading(false);
        toast.success("Password Reset Successfully");
        navigate("/login");
      })
      .catch(({ response }) => {
        setLoading(false);
        toast.error(response.data.message);
        console.log(response);
      });
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: resetSchema,
    onSubmit: () => {
      resetPassword(formik.values);
      formik.resetForm();
    },
  });

  return (
    <div className="container">
      <div className="row justify-content-center py-5">
        <form
          className="form d-flex flex-column gap-3 mt-5 py-4 px-3 col-12 col-md-8 col-lg-6 col-md-6 rounded-2 shadow"
          onSubmit={formik.handleSubmit}
        >
          <h4>Reset Account Password</h4>
          <input
            type="email"
            className="form-control"
            placeholder="Your E-mail"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="font-sm text-danger ps-3">
              {"*" + formik.errors.email}
            </p>
          )}
          <input
            type="password"
            className="form-control"
            placeholder="New Password"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.newPassword && formik.touched.newPassword && (
            <p className="font-sm text-danger ps-3">
              {"*" + formik.errors.newPassword}
            </p>
          )}
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
              "Reset"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
