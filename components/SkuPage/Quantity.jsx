'use client'
import React, { useState } from 'react'
import {Button} from "@nextui-org/react";

const Quantity = () => {
    const [value, setValue] = useState(1)
  return (
    <div className="flex-col md:flex-row flex items-center font-semibold m-4 gap-2">
              <p>Quantity</p>
              <Button className="border flex w-36 justify-around p-2 rounded-md select-none bg-transparent">
                <p onClick={() => setValue((prev) => prev - 1)}>-</p>
                <p> {value < 1 ? setValue(1) : value} </p>
                <p onClick={() => setValue((prev) => prev + 1)}>+</p>
              </Button>
              <p className="flex gap-1 opacity-70 text-sm md:text-md">
                Rs.
                {
                  <span className="">
                    &#x20B9;{(52000 * value).toLocaleString()}
                  </span>
                }
                <span className='text-Primary'>(incl. of all taxes)</span>
              </p>
            </div>
  )
}

export default Quantity