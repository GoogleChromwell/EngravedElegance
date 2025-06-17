import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import EditProduct from "./EditProduct";
import AuthModalWrapper from "../Modal/AuthModalWrapper";

export default function InventoryTable() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost/EngravedElegance/backend/Products/DisplayProducts.php")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const deleteProduct = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    axios
      .put(
        "http://localhost/EngravedElegance/backend/Products/DeleteProduct.php",
        { id },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        toast.success("Product deleted successfully");
        fetchProducts();
      })
      .catch(() => {
        toast.error("Failed to delete product");
      });
  };

  return (
    <div className="flex flex-col w-full h-full p-4 text-primary-dark">
      <ToastContainer />
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold custom-tablet:text-[16px] custom-mobileSmall:text-[14px]">
          Products List
        </h1>
      </div>

      <AuthModalWrapper isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EditProduct ProductToEdit={editingProduct} onBackToLogin={() => setIsModalOpen(false)} />
      </AuthModalWrapper>

      <div className="overflow-x-auto custom-tablet:max-w-full custom-mobileSmall:max-w-[410px]">
        <table className="table-auto text-left font-poppins w-full">
          <thead className="bg-primary-dark text-white font-semibold text-[12px]">
            <tr>
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Product Name</th>
              <th className="px-3 py-2">Availability</th>
              <th className="px-3 py-2">Stock</th>
              <th className="px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[12px] font-medium">
            {products.map((product) => (
              <tr
                key={product.product_id}
                className="border-t border-primary-dark border-opacity-30"
              >
                <td className="px-3 py-3">{product.product_id}</td>
                <td className="px-3 py-3">{product.product_name}</td>
                <td className="px-3 py-3">
                  {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                </td>
                <td className="px-3 py-3">{product.quantity}</td>
                <td className="flex gap-1 px-3 py-3 items-center">
                  <button
                    className="bg-primary-dark text-white text-xs px-2 py-1 rounded w-full"
                    onClick={() => handleEditClick(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white text-xs px-2 py-1 rounded w-full"
                    onClick={() => deleteProduct(product.product_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
