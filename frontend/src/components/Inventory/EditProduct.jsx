import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import axios from "axios";

export default function EditProduct({ ProductToEdit }) {
  const [product, setProductData] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (ProductToEdit?.product_id) {
        try {
          const response = await axios.get(
            `http://localhost/EngravedElegance/backend/Products/EditProduct.php?product_id=${ProductToEdit.product_id}`
          );
          setProductData(response.data);
        } catch (error) {
          console.error("Failed to fetch Product details:", error);
          toast.error("Failed to load Product data");
        }
      }
    };

    fetchProduct();
  }, [ProductToEdit]);

  const initialValues = {
    product_name: product?.product_name || "",
    quantity: product?.quantity || "",
    price: product?.price || "",
    product_description: product?.product_description || "",
  };

  const validationSchema = Yup.object().shape({
    product_name: Yup.string().required("*Product name is required"),
    product_description: Yup.string().required("*Product description is required"),
    price: Yup.number()
      .typeError("*Price must be a number")
      .required("*Price is required")
      .min(0, "*Can't be negative"),
    quantity: Yup.number()
      .typeError("*Quantity must be a number")
      .required("*Quantity is required")
      .min(0, "*Can't be negative"),
  });

  const onSubmit = async (values) => {
    try {
      await axios.put(
        "http://localhost/EngravedElegance/backend/Products/EditProduct.php",
        { ...values, product_id: ProductToEdit.product_id },
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Product updated successfully!");
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  if (ProductToEdit?.product_id && !product) {
    return <div className="p-5">Loading Product data...</div>;
  }

  return (
    <div className="custom-tablet:w-[400px] custom-mobileSmall:w-[300px] h-full">
      <ToastContainer />
      <div className="w-full justify-center items-center p-5 rounded-[5px]">
        <h1 className="text-center font-bold text-[18px] pb-5">Edit Product</h1>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="flex flex-col gap-5 w-full">
            <div>
              <h1 className="text-[14px] font-medium">Product Name</h1>
              <Field
                name="product_name"
                className="w-full border border-gray-500 p-2 rounded-[5px] text-[14px] font-medium"
              />
              <ErrorMessage name="product_name" component="div" className="text-red-500 text-[14px]" />
            </div>

            <div>
              <h1 className="text-[14px] font-medium">Description</h1>
              <Field
                as="textarea"
                name="product_description"
                className="w-full border border-gray-500 p-2 rounded-[5px] text-[14px] font-medium min-h-[120px] resize-y"
              />
              <ErrorMessage name="product_description" component="div" className="text-red-500 text-[14px]" />
            </div>

            <div>
              <h1 className="text-[14px] font-medium">Price</h1>
              <Field
                name="price"
                className="w-full border border-gray-500 p-2 rounded-[5px] text-[14px] font-medium"
              />
              <ErrorMessage name="price" component="div" className="text-red-500 text-[14px]" />
            </div>

            <div>
              <h1 className="text-[14px] font-medium">Quantity</h1>
              <Field
                name="quantity"
                className="w-full border border-gray-500 p-2 rounded-[5px] text-[14px] font-medium"
              />
              <ErrorMessage name="quantity" component="div" className="text-red-500 text-[14px]" />
            </div>

            <div className="space-y-3 col-span-2">
              <button
                type="submit"
                className="bg-primary-dark text-white font-medium text-[14px] w-full rounded-[5px] h-[42px] active:bg-opacity-50"
              >
                Update Product
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
