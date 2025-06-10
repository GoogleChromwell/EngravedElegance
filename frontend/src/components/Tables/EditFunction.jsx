import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import axios from "axios";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export default function EditFunction({ staffToEdit }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [staffData, setStaffData] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      if (staffToEdit?.id) {
        try {
          const response = await axios.get(
            `http://localhost/Engraved-Clone/EngravedElegance/backend/Staff/GetUser.php?id=${staffToEdit.id}`
          );
          setStaffData(response.data);
        } catch (error) {
          console.error("Failed to fetch staff details:", error);
          toast.error("Failed to load staff data");
        }
      }
    };

    fetchStaff();
  }, [staffToEdit]);

  const initialValues = {
    email: staffData?.email || "",
    password: staffData?.password || "",
    confirmPassword: "",
    first_name: staffData?.first_name || "",
    last_name: staffData?.last_name || "",
    middle_initial: staffData?.middle_initial || "",
    address: staffData?.address || "",
    contact_number: staffData?.contact_number || "",
    monthly_salary: staffData?.monthly_salary || "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("*Email is required")
      .email('*Email must contain "@"'),
    password: Yup.string().required("*Password is required"),
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
      .required("*Monthly salary is required")
      .min(1, "*Must be greater than 1"),
  });

  const onSubmit = async (values, { resetForm }) => {
    const payload = { ...values, role: "staff" };

    try {
      if (staffToEdit?.id) {
        await axios.put(
          `http://localhost/Engraved-Clone/EngravedElegance/backend/Staff/UpdateUser.php`,
          { ...payload, id: staffToEdit.id },
          { headers: { "Content-Type": "application/json" } }
        );
        resetForm();
        toast.success("Staff updated successfully!");
      } else {
        await axios.post(
          "http://localhost/Engraved-Clone/EngravedElegance/backend/Authentication/Registration.php",
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
        resetForm();
        toast.success("Staff registered successfully!");
      }

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  if (staffToEdit?.id && !staffData) {
    return <div className="p-5">Loading staff data...</div>;
  }

  return (
    <div className="w-full h-full">
      <ToastContainer />
      <div className="w-fit h-auto justify-center items-center p-5 rounded-[5px]">
        <h1 className="text-center font-bold text-[18px] pb-5">
          {staffToEdit ? "Edit Staff" : "Add New Staff"}
        </h1>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="grid grid-cols-2 gap-5">

            <div className="col-span-2">
              <h1 className="text-[14px] font-medium">Email</h1>
              <Field
                name="email"
                placeholder="Email"
                className="w-full border border-gray-500 p-2 rounded-[5px] text-[14px] font-medium"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-[14px]"
              />
            </div>

            {/* <div>
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full border border-gray-500 p-2 rounded-[5px] pr-10 text-[14px] font-medium"
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
                name="password"
                component="div"
                className="text-red-500 text-[14px]"
              />
            </div> */}

            <div>
              <h1 className="text-[14px] font-medium">First name</h1>
              <Field
                name="first_name"
                placeholder="First Name"
                className="w-full border border-gray-500 p-2 rounded-[5px] text-[14px] font-medium"
              />
              <ErrorMessage
                name="first_name"
                component="div"
                className="text-red-500 text-[14px]"
              />
            </div>

            <div>
              <h1 className="text-[14px] font-medium">Last name</h1>
              <Field
                name="last_name"
                placeholder="Last Name"
                className="w-full border border-gray-500 p-2 rounded-[5px] text-[14px] font-medium"
              />
              <ErrorMessage
                name="last_name"
                component="div"
                className="text-red-500 text-[14px]"
              />
            </div>

            <div>
              <h1 className="text-[14px] font-medium">Middle Initial</h1>
              <Field
                name="middle_initial"
                placeholder="Middle Initial"
                className="w-full border border-gray-500 p-2 rounded-[5px] text-[14px] font-medium"
              />
              <ErrorMessage
                name="middle_initial"
                component="div"
                className="text-red-500 text-[14px]"
              />
            </div>

            <div>
              <h1 className="text-[14px] font-medium">Address</h1>
              <Field
                name="address"
                placeholder="Address"
                className="w-full border border-gray-500 p-2 rounded-[5px] text-[14px] font-medium"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-[14px]"
              />
            </div>

            <div>
              <h1 className="text-[14px] font-medium">Contact number</h1>
              <Field
                name="contact_number"
                placeholder="Contact Number"
                className="w-full border border-gray-500 p-2 rounded-[5px] text-[14px] font-medium"
              />
              <ErrorMessage
                name="contact_number"
                component="div"
                className="text-red-500 text-[14px]"
              />
            </div>

            <div>
              <h1 className="text-[14px] font-medium">Monthly Salary</h1>
              <Field
                name="monthly_salary"
                placeholder="Monthly Salary"
                className="w-full border border-gray-500 p-2 rounded-[5px] text-[14px] font-medium"
              />
              <ErrorMessage
                name="monthly_salary"
                component="div"
                className="text-red-500 text-[14px]"
              />
            </div>

            <div className="space-y-3 col-span-2">
              <button
                type="submit"
                className="bg-primary-dark text-white font-medium text-[14px] w-full rounded-[5px] h-[42px] active:bg-opacity-50"
              >
                {staffToEdit ? "Update Staff" : "Add Staff"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
