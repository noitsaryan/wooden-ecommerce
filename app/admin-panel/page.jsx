'use client'
import AddProduct from '@/components/Admin/AddProduct'
import EditProduct from '@/components/Admin/EditProduct'
import Orders from '@/components/Admin/Orders'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const params = useSearchParams()
  const topic = params.get('topic')
  return (
    <>
      {
        topic === 'orders' ? <Orders /> : (topic === 'addproduct' ? <AddProduct /> : (topic === 'editproduct' ? <EditProduct />: <Orders/>))
      }
    </>
  )
}

export default Page