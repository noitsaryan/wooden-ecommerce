'use client'
import AddProduct from '@/components/Admin/AddProduct'
import EditProduct from '@/components/Admin/EditProduct'
import Orders from '@/components/Admin/Orders'
import Statistics from '@/components/Admin/Statistics'
import { useSearchParams } from 'next/navigation'
import React from 'react'

function page() {
  const params = useSearchParams()
  const topic = params.get('topic')
  return (
    <>
      {
        topic === 'statistics' ? <Statistics/> : (topic === 'orders' ? <Orders/> : (topic === 'addproduct' ? <AddProduct/> : (topic === 'editproduct' ? <EditProduct/> : <Statistics/>)) )  
      }
    </>
  )
}

export default page