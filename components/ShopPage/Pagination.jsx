"use client";
import React, { useEffect, useState } from "react";
import { Pagination, Button } from "@nextui-org/react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useParams, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import axios from "axios";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    router.push(`${pathname}/?p=${currentPage}`);
  }, [currentPage]);

  return (
    <div className={`flex flex-col gap-5`}>
      <div className="flex gap-2 items-center justify-center ">
        <RiArrowLeftSLine
          className=" text-Primary text-2xl cursor-pointer "
          onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
        />

        <Pagination  page={currentPage} onChange={setCurrentPage} />

        <RiArrowRightSLine
          className=" text-Primary text-2xl cursor-pointer"
          onClick={() => setCurrentPage((prev) => (prev + 1 ))}
        />
      </div>
    </div>
  );
}
