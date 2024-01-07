"use client";
import { Button } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import AddReview from "./AddReview";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Reviews = ({ sku }) => {
  const [reviews, setReviews] = useState([]);
  const [pagination, setPagination] = useState(0);
  const session = useSession();

  const getReviews = async () => {
    try {
      const res = await axios.post("/api/get-review", {
        index: pagination,
        quantity: 3,
        sku: sku,
      });

      setReviews(res.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getReviews();
  }, [sku, pagination]);

    useEffect(() => {
   if(!reviews){
    setPagination(0)
   }
  }, [reviews]);
  return (
    <section className="w-full  bg-slate-100 p-3 space-y-3 border-b">
      <span className="flex items-center justify-between gap-3">
        <h3>
          Total Reviews: {(reviews && reviews.length) || "No Reviews Yet"}
        </h3>
        {session.status === "authenticated" ? (
          <AddReview sku={sku} getReviews={getReviews}/>
        ) : (
          <Button
            as={Link}
            href="/login"
            className="bg-Primary text-white"
            size="sm"
          >
            Add a Review
          </Button>
        )}
        {/* <h2>Total Ratings: 4.5K</h2> */}
      </span>

      <div className="h-full w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviews &&
          reviews.map((e, i) => (
            <div
              key={i}
              className="h-full bg-white shadow-sm p-4 flex items-start justify-start flex-col gap-2 rounded-md max-h-32 overflow-hidden overflow-y-scroll"
            >
              <span className="flex text-sm items-center justify-center gap-2 font-semibold">
                {" "}
                <p className="bg-green-400 p-1 rounded flex items-center justify-center gap-[5px]font-semibold ">
                  {e.rating} <IoStarSharp />
                </p>{" "}
                <p>Good</p>{" "}
              </span>
              <p>{e.comment}</p>
              <h3 className="text-sm opacity-70">
                {e.userId.name.first_name} {e.userId.name.last_name}
              </h3>
            </div>
          ))}
      </div>
      {reviews && reviews ? (
        <span className="flex items-center justify-center gap-3 text-white">
          <Button
            className="bg-Primary text-white"
            onClick={() => setPagination((prev) => (prev == 0 ? 0 : prev - 1))}
            size="sm"
          >
            prev
          </Button>{" "}
          <Button
            className="bg-Primary text-white"
            size="sm"
            onClick={() => setPagination((prev) =>prev + 1 )}
          >
            Next
          </Button>
        </span>
      ) : null}
    </section>
  );
};

export default Reviews;
