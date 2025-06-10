import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/Products/DisplayProducts.php"
      )
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log("Error fetching products: ", error);
      });
  }, []);
  return (
    <div className="p-[10px] flex flex-col gap-4 justify-center items-center">
      <div className="
      grid  gap-4
      custom-laptopMedium:grid-cols-5
      custom-laptop:grid-cols-3
      custom-mobileSmall:grid-cols-2">
        {products.map((product) => (
          <ProductCard
            key={product.product_id}
            productID={product.product_id}
            name={product.product_name}
            description={product.product_description}
            price={product.price}
            quantity={product.quantity}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}
