"use client";
import React, { useEffect, useState } from "react";
import { Pagination, Button } from "@nextui-org/react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useParams, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [productLen, setProductLen] = useState("");
  const params = useParams();
  const { category } = params;

  const pathname = usePathname();
  const router = useRouter();

  const fetchProducts = async (type) => {
    if (
      category === "residence" ||
      category === "commercial" ||
      category === "studio" ||
      category === "lighting"
    ) {
      const res = await axios.post("/api/get-product-category", {
        type,
      });
      setProductLen(res.data.length);
      // console.log(res.data.length);
      return;
    }
    const res = await axios.get("/api/get-products");
    setProductLen(res.data.length);
    // console.log(res.data.length);
  };

  useEffect(() => {
    fetchProducts(category);
  }, []);



  useEffect(() => {
    router.push(`${pathname}/?p=${currentPage}`);
  }, [currentPage]);

  return (
    <div className={`flex flex-col gap-5 ${productLen==0 ? 'hidden' :'flex'}`}>
      <div className="flex gap-2 items-center justify-center ">
        <RiArrowLeftSLine
          className=" text-Primary text-2xl cursor-pointer "
          onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
        />

        <Pagination total={Math.ceil(productLen/12)} page={currentPage} onChange={setCurrentPage} />

        <RiArrowRightSLine
          className=" text-Primary text-2xl cursor-pointer"
          onClick={() => setCurrentPage((prev) => (prev < Math.ceil(productLen/12) ? prev + 1 : prev))}
        />
      </div>
    </div>
  );
}
