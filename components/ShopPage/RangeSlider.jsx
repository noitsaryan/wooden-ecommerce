'use client'
import React from "react";
import {Slider} from "@nextui-org/react";


export default function RangeSlider({setRangeValue}) {
  const [value, setValue] = React.useState([2000, 50000]);
  setRangeValue(value)


  return (
    <div className="flex flex-col gap-2 w-full h-full max-w-md md:items-start items-center justify-center">
        <p className="font-semibold">Filter by Price</p>
      <Slider 
        label="Select a budget"
        formatOptions={{style: "currency", currency: "INR"}}
        step={10}
        maxValue={100000}
        minValue={500}
        value={value} 
        onChange={setValue}
        className="max-w-xs"
        size="sm"
        classNames={{
            filler:"bg-Primary",
            thumb:"bg-Primary "
        }}
      />
     
    </div>
  );
}
