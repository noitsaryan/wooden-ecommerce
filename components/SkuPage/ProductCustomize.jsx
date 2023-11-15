import React, { useState } from 'react'
import { RadioGroup, Radio } from "@nextui-org/react";

const ProductCustomize = ({ isTrue }) => {
  console.log(isTrue)

  const [size, setSize]=useState('king')
  return (

    isTrue ? <section className='px-2 font-light'>
      <h2>Customise</h2>
      <p className='text-xs opacity-75'>Note: The following services and products incur additional charges.*</p>
      <div className='w-full border rounded flex gap-2 items-center  p-3 mt-2'>
        <RadioGroup
           label={`Selected Size: ${size}`}
          orientation="horizontal"
          value={size}
          onValueChange={setSize}
          size='sm'
        >
          <Radio value="king">King</Radio>
          <Radio value="queen">Queen</Radio>

        </RadioGroup>
    <p>{size}</p>
      </div>
    </section> : null
  )
}

export default ProductCustomize