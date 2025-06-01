import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export default function Register({ onBackToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    confirmPassword: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("*Username is required").min(5).max(100),
    email: Yup.string()
      .required("*Email is required")
      .min(1)
      .max(100)
      .email('*Email must contain "@"'),
    password: Yup.string().required("*Password is required"),
    confirmPassword: Yup.string()
      .required("*Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "*Password doesn't match"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const payload = {
        ...values,
        role: "staff",
      };

      const response = await axios.post(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/Authentication/Registration.php",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Registration Success: ", response.data);
      toast.success("Registration Success!");
      
      
      setTimeout(() => {
        window.location.reload()
      }, 3000);
      resetForm();
    } catch (error) {
      console.error("Error: ", error.response?.data || error.message);
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="w-full h-full">
      <ToastContainer />
      <div className="w-[360px] h-auto justify-center items-center p-5 rounded-[5px]">
        <h1 className="text-center font-bold text-[18px] pb-5">Sign Up</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="flex flex-col gap-5">
            {/* Username */}
            <div>
              <Field
                className="w-full border border-primary-dark border-opacity-50 p-2 rounded-[5px] text-[14px] font-medium"
                placeholder="Username"
                id="username"
                name="username"
              />
              <ErrorMessage
                className="text-red-500 font-normal text-[14px]"
                name="username"
                component="div"
              />
            </div>

            {/* Email */}
            <div>
              <Field
                className="w-full border border-gray-500 p-2 rounded-[5px] text-[14px] font-medium"
                placeholder="Email"
                id="email"
                name="email"
              />
              <ErrorMessage
                className="text-red-500 font-normal text-[14px]"
                name="email"
                component="div"
              />
            </div>

            {/* Password */}
            <div className="space-y-5">
              <div>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    className="w-full border border-gray-500 p-2 rounded-[5px] pr-10 text-[14px] font-medium"
                    placeholder="Password"
                    id="password"
                    name="password"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <RemoveRedEyeOutlinedIcon style={{ fontSize: "20px" }} />
                    ) : (
                      <VisibilityOffOutlinedIcon style={{ fontSize: "20px" }} />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  className="text-red-500 font-normal text-[14px]"
                  name="password"
                  component="div"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <div className="relative">
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full border border-gray-500 p-2 rounded-[5px] pr-10 text-[14px] font-medium"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      <RemoveRedEyeOutlinedIcon style={{ fontSize: "20px" }} />
                    ) : (
                      <VisibilityOffOutlinedIcon style={{ fontSize: "20px" }} />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  className="text-red-500 font-normal text-[14px]"
                  name="confirmPassword"
                  component="div"
                />
              </div>
            </div>

            {/* Submit Button and Login Redirect */}
            <div className="space-y-3">
              <input
                type="submit"
                value="Register"
                className="bg-primary-dark text-white font-medium text-[14px] w-full rounded-[5px] h-[42px] active:bg-primary-dark active:bg-opacity-50"
              />
              <div className="flex items-center font-semibold text-[12px] justify-center gap-0.5">
                <p className="opacity-50">Already have an account?</p>
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="underline text-blue-600 hover:text-blue-800"
                >
                  Login
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
