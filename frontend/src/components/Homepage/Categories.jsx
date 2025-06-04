import { Field, Form, Formik } from "formik";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const initialValues = {
  searchProduct: "",
};

const onSubmit = async (values) => {
  console.log(values);
};

export default function Categories() {
  return (
    <div className="flex flex-col h-fit w-full bg-primary-light border-b-[0.1px] border-custom-gray border-opacity-50">
      <div className="flex p-[10px] justify-center">
        <div className="flex place-items-center gap-2 w-full max-w-md">
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className="w-full">
              <div className="relative w-full">
                <SearchIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  style={{ fontSize: "18px" }}
                />
                <Field
                  name="searchProduct"
                  id="searchProduct"
                  placeholder="Search a product"
                  className="w-full border border-gray-500 p-[5px] pl-10 rounded-custom-xs 
                  text-[14px] font-poppins font-medium"
                />
              </div>
            </Form>
          </Formik>

          <button
            className="
            shadow border border-primary-dark border-opacity-20 h-full w-9 
            flex items-center justify-center bg-white hover:bg-primary-dark hover:bg-opacity-10"
          >
            <FilterAltOutlinedIcon style={{ fontSize: "22px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}
