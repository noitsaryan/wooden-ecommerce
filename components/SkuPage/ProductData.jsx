import React from 'react'
import DataTab from './DataTab'

const ProductData = ({title, price, description, specification}) => {
  return (
    <div>
      <div className='px-2'>
      <h2 className='font-semibold text-xl'> {title} </h2> 
       <h3 className='text-2xl mt-3'>Rs. {price} </h3>
      <p className='bg-Primary text-xs p-1 w-fit text-white'>Price inclusive of all taxes | Free shipping</p>

      </div>
       <DataTab  des={description} specs={specification} />
    </div>
  )
}

export default ProductData