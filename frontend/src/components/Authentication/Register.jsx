import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
export default function Register({ onBackToLogin }) {
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
    confirmPassword: Yup.string().required("*Confirm Password is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/Authentication/Registration.php",
        {
          values,
          role: "staff",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Registration Success: ", response.data);
      toast.success("Registration Success!");
      resetForm();
    } catch (error) {
      console.error("Error: ".error);
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="w-full h-full">
      <ToastContainer />
      <div className="w-[360px] h-auto justify-center items-center p-5 rounded-[5px]">
        <h1 className="text-center font-bold  text-[18px] pb-5">Sign Up</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="flex flex-col gap-5">
            <div>
              <div>
                <Field
                  className="
                            w-full border border-primary-dark border-opacity-50 p-2 rounded-[5px] 
                            text-[14px]  font-medium"
                  placeholder="Username"
                  id="username"
                  name="username"
                ></Field>
              </div>

              <ErrorMessage
                className="text-red-500 font-normal  text-[14px]"
                name="username"
                component="div"
              />
            </div>

            <div>
              <div>
                <Field
                  className="
                            w-full border border-gray-500 p-2 rounded-[5px] 
                            text-[14px]  font-medium"
                  placeholder="Email"
                  id="email"
                  name="email"
                ></Field>
              </div>

              <ErrorMessage
                className="text-red-500 font-normal  text-[14px]"
                name="email"
                component="div"
              />
            </div>

            <div className="space-y-5">
              <div>
                <div>
                  <Field
                    type="password"
                    className="
                                w-full border border-gray-500 p-2 rounded-[5px]
                                text-[14px]  font-medium"
                    placeholder="Password"
                    id="password"
                    name="password"
                  ></Field>
                </div>
                <ErrorMessage
                  className="text-red-500 font-normal  text-[14px]"
                  name="password"
                  component="div"
                />
              </div>

              <div>
                <div>
                  <Field
                    type="password"
                    className="
                                w-full border border-gray-500 p-2 rounded-[5px]
                                text-[14px]  font-medium"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                  ></Field>
                </div>
                <ErrorMessage
                  className="text-red-500 font-normal  text-[14px]"
                  name="confirmPassword"
                  component="div"
                />
              </div>
            </div>
            <div>
              <div className="space-y-3">
                <input
                  type="submit"
                  value={"Register"}
                  className="
                    bg-primary-dark text-white  font-medium text-[14px]
                    w-full rounded-[5px] h-[42px] active:bg-primary-dark active:bg-opacity-50"
                />

                <div className="flex place-items-center  font-semibold text-[12px] justify-center gap-0.5">
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
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
