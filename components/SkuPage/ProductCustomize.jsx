import React from 'react'
import {RadioGroup, Radio} from "@nextui-org/react";

const ProductCustomize = () => {
  return (
    <section className='px-2'>
   <h2 className='font-semibold'>Customise</h2>
   <p className='text-xs opacity-75'>Note: The following services and products incur additional charges.*</p>
   <div  className='w-full border rounded flex gap-2 items-center  p-3 mt-2'>
   <RadioGroup
      label="Select Size"
      orientation="horizontal"
      size='sm'
    >
      <Radio value="king">King</Radio>
      <Radio value="queen">Queen</Radio>

    </RadioGroup>

   </div>
    </section>
  )
}

export default ProductCustomize