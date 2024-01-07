"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../Cards/Product";

const RecentViewProducts = () => {
  const [recent, setRecent] = useState([]);
  const [response, setResponse] = useState([]);

  const getRecentProducts = async() => {
    try {
      const res = await axios.post("/api/get-recent-products", {
        skus: recent,
      });
      setResponse(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getLocalRecent = JSON.parse(localStorage.getItem("recentProducts"));
    setRecent(getLocalRecent);
  }, []);

  useEffect(() => {
    getRecentProducts();
  }, [recent]);



  return (
    <>
      {response && response.length == 0 ? null : (
        <p className="text-Dark text-2xl font-light text-center -tracking-2 uppercase mt-6">
          RECENTLY VIEWED
        </p>
      )}
      <section className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 p-2 gap-6">
        {response &&
          response.map((e, i) => (
            <Product
              key={i}
              sku={e.sku}
              title={e.title}
              price={e.price}
              link={e.images}
            />
          ))}
      </section>
    </>
  );
};

export default RecentViewProducts;
