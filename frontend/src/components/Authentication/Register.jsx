import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import axios from "axios";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export default function Register({ onBackToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    middle_initial: "",
    address: "",
    contact_number: "",
    monthly_salary: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("*Email is required")
      .email('*Email must contain "@"'),
    password: Yup.string().required("*Password is required"),
    confirmPassword: Yup.string()
      .required("*Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "*Password doesn't match"),
    first_name: Yup.string().required("*First name is required"),
    last_name: Yup.string().required("*Last name is required"),
    middle_initial: Yup.string().required("*Middle initial is required"),
    address: Yup.string().required("*Address is required"),
    contact_number: Yup.string()
      .required("*Contact number is required")
      .matches(/^\d+$/, "*Must be a number only")
      .min(11, "*Must be at least 11 digits")
      .max(11, "*Cannot exceed 11 digits"),
    monthly_salary: Yup.number()
      .typeError("*Monthly salary must be a number")
      .required("*Monthly salary is required"),
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
        window.location.reload();
      }, 2000);
      resetForm();
    } catch (error) {
      console.error("Error: ", error.response?.data || error.message);
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="w-full h-full">
      <ToastContainer />
      <div className="w-full h-auto justify-center items-center p-5 rounded-[5px]">
        <h1 className="text-center font-bold text-[18px] pb-5">
          Register Staff
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="grid grid-cols-2 gap-5">
            <div className="col-span-2 flex flex-col gap-1">
              <h1 className="text-[14px] font-medium">Email</h1>
              <Field
                name="email"
                className="w-full border border-gray-500 p-2 rounded-[5px] text-[14px] font-medium"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-[14px]"
              />
            </div>

            <div>
              <div className="relative flex flex-col gap-1">
                <h1 className="text-[14px] font-medium">Password</h1>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full border border-gray-500 p-2 rounded-[5px] pr-10 text-[14px] font-medium"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/5 text-gray-500"
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
                name="password"
                component="div"
                className="text-red-500 text-[14px]"
              />
            </div>

            <div>
              <div className="relative flex flex-col gap-1">
                <h1 className="text-[14px] font-medium">Confirm Password</h1>
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="w-full border border-gray-500 p-2 rounded-[5px] pr-10 text-[14px] font-medium"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/5 text-gray-500"
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
                name="confirmPassword"
                component="div"
                className="text-red-500 text-[14px]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="text-[14px] font-medium">First name</h1>
              <Field
                name="first_name"
                className="w-full border border-gray-500 p-2 rounded-[5px] text-[14px] font-medium"
              />
              <ErrorMessage
                name="first_name"
                component="div"
                className="text-red-500 text-[14px]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="text-[14px] font-medium">Last name</h1>
              <Field
                name="last_name"
                className="w-full border border-gray-500 p-2 rounded-[5px] text-[14px] font-medium"
              />
              <ErrorMessage
                name="last_name"
                component="div"
                className="text-red-500 text-[14px]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="text-[14px] font-medium">Middle Initial</h1>
              <Field
                name="middle_initial"
                className="w-full border border-gray-500 p-2 rounded-[5px] text-[14px] font-medium"
              />
              <ErrorMessage
                name="middle_initial"
                component="div"
                className="text-red-500 text-[14px]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="text-[14px] font-medium">Address</h1>
              <Field
                name="address"
                className="w-full border border-gray-500 p-2 rounded-[5px] text-[14px] font-medium"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-[14px]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="text-[14px] font-medium">Contact Number</h1>
              <Field
                name="contact_number"
                className="w-full border border-gray-500 p-2 rounded-[5px] text-[14px] font-medium"
              />
              <ErrorMessage
                name="contact_number"
                component="div"
                className="text-red-500 text-[14px]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="text-[14px] font-medium">Monthly Salary</h1>
              <Field
                name="monthly_salary"
                className="w-full border border-gray-500 p-2 rounded-[5px] text-[14px] font-medium"
              />
              <ErrorMessage
                name="monthly_salary"
                component="div"
                className="text-red-500 text-[14px]"
              />
            </div>

            <div className="space-y-3 col-span-2">
              <input
                type="submit"
                value="Add staff"
                className=" bg-primary-dark text-white font-medium text-[14px] w-full rounded-[5px] h-[42px] active:bg-primary-dark active:bg-opacity-50"
              />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
