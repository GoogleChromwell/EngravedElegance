import React from "react";
import ProductCard from "./ProductCard";

export default function Products() {
  return (
    <div className="p-[10px] flex flex-col gap-4 justify-center items-center">
      <div className="flex gap-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <div className="flex gap-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}
