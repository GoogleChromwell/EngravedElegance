import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const SignupSchema = Yup.object().shape({});

export default function Login({ onSignupClick }) {
  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/Authentication/Login.php",
        values,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Raw response:", response); // log full response
      console.log("Response data:", response.data);

      if (response.data && response.data.message === "Login successful") {
        toast.success("Login Success!");
        resetForm();
      } else {
        toast.error("Invalid login credentials");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message || error);
      toast.error("Login Failed (catch)");
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("*Email is required")
      .min(1)
      .max(100)
      .email('*Email must contain "@"'),
    password: Yup.string().required("*Password is required"),
  });

  return (
    <div className="w-full h-auto">
      <ToastContainer />
      <div className=" w-full h-auto justify-center items-center p-5 rounded-[5px]">
        <h1 className="text-center font-bold  text-[18px] pb-5"> Sign In </h1>

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

            <div className="space-y-2">
              <div>
                <div>
                  <Field
                    className="
                                w-full border border-gray-500 p-2 rounded-[5px]
                                text-[14px]  font-medium"
                    placeholder="Password"
                    id="password"
                    name="password"
                  ></Field>
                </div>

                <ErrorMessage
                  className="text-red-500 font-normal  text-[14px] pb-3"
                  name="password"
                  component="div"
                />
              </div>

              <div className="flex justify-between place-items-center gap-20">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    className="size-[16px] place-self-center"
                  />
                  <p className=" font-medium text-[12px]">Show password</p>
                </div>

                <div className="flex">
                  <Link to={"/"} className=" font-medium text-[12px] underline">
                    {" "}
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-3">
                <input
                  type="submit"
                  value={"Login"}
                  className="
                    bg-primary-dark text-white  font-medium text-[14px]
                    w-full rounded-[5px] h-[42px] active:bg-blue-600"
                />

                <div className="flex place-items-center font-medium text-[12px] justify-center gap-0.5">
                  <p className="opacity-50">No account yet?</p>
                  <button
                    type="button"
                    onClick={onSignupClick}
                    className="underline text-blue-600 hover:text-blue-800"
                  >
                    Register
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
