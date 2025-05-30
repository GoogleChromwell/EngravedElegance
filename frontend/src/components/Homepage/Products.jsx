import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://localhost/Engraved-Clone/EngravedElegance/backend/DisplayProducts.php"
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
      <div className="flex gap-4">
        {products.map((product, index) => (
          <ProductCard 
          key={{index}}
          name={product["product-name"]}
          description={product["product-description"]}
          price={product.price}
          quantity={product.quantity}/>
        ))}
      </div>
    </div>
  );
}
