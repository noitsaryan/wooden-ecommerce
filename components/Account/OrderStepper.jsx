import React from 'react'

const OrderStepper = ({state, message}) => {
  return (
   <>
   
<div className='p-4'>
    
<ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">                  
    <li className=" ml-6">            
        <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
            <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
        </span>
        <h3 className="font-medium leading-tight"> {state} </h3>
        <p className="text-sm capitalize"> {message} </p>
    </li>
</ol>
</div>

</>


  )
}

export default OrderStepper