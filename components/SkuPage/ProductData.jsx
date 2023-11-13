import React from 'react'
import DataTab from './DataTab'

const ProductData = ({title, price, description, specification}) => {
  return (
    <div>
      <div className='px-2'>
      <h2 className='font-light text-2xl'> {title} </h2> 
       <h3 className='text-xl font-light mt-3'>Rs. {parseInt(price).toLocaleString()} </h3>
      <p className='bg-Primary text-xs p-1 w-fit font-light text-white'>Price inclusive of all taxes | Free shipping</p>

      </div>
       <DataTab  des={description} specs={specification} />
    </div>
  )
}

export default ProductData