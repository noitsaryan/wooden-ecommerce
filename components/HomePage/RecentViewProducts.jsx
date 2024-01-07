"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../Cards/Product";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
      <section className="w-full p-4 gap-6">
        <Carousel
 additionalTransfrom={0}
  arrows
  autoPlaySpeed={3000}
  centerMode={false}
  containerClass="container-with-dots"
  dotListClass=""
  draggable
  focusOnSelect={false}
  infinite
  keyBoardControl
  minimumTouchDrag={80}
  pauseOnHover
  renderArrowsWhenDisabled={false}
  renderButtonGroupOutside={false}
  renderDotsOutside={false}

  responsive={{
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 4,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 1,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 2,
      partialVisibilityGutter: 30
    }
  }}
  rewind={false}
  rewindWithAnimation={false}
  rtl={false}
  shouldResetAutoplay
  showDots={false}
  sliderClass=""
  slidesToSlide={1}
  swipeable
>
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
</Carousel>
       
      </section>
    </>
  );
};

export default RecentViewProducts;
