"use client";
import Product from "@/components/Cards/Product";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function ProductShopPage() {
  const [response, setResponse] = useState();
  const seachParms = useSearchParams();
  const page = seachParms.get("p");
  const fetchProduct = async () => {
    try {
      const res = await axios.get("/api/get-product-cards");
      setResponse(res);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-2 gap-6">
      {response &&
        response.data
          .slice(page ? Math.max(page * 12 - 12, 0) : 0, page ? page * 12 : 12)
          .map((e, i) => (
            <Product
              key={i}
              sku={e.sku}
              title={e.title}
              price={e.price}
              link={e.images}
            />
          ))}
    </section>
  );
}

export default ProductShopPage;
