import React from 'react'
import {Checkbox} from "@nextui-org/react";

const ProductCustomize = () => {
  return (
    <section className='px-2'>
   <h2 className='font-semibold'>Customise Size</h2>
   <p className='text-xs opacity-75'>Note: The following services and products incur additional charges.*</p>
   <div  className='w-full border rounded flex gap-2 items-center  p-3 mt-2'>
   <Checkbox defaultSelected radius="sm">Queen</Checkbox>
   <Checkbox  radius="xs">King</Checkbox>

   </div>
    </section>
  )
}

export default ProductCustomize