'use client'
import React from 'react'
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useToast } from "../ui/use-toast"
import AddCart from '../buttons/AddCart';
import { Button } from '@nextui-org/react'


const CtaButton = ({ amount, price, totalPrice, sku, quantity }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const { toast } = useToast()
  
  const userData = async () => {
    const emailId = session?.user?.email;
    if (!emailId) {
      toast({
        title: 'Please log in to continue - Redirecting to login page'
      })
      router.push('/login')
      return;
    }
    const res = await axios.post('/api/get-user-by-id', {
      user: emailId,
      order: false
    })
    return res.data.res._id;
  }
  const checkout = async () => {
    try {
      const result = await userData();
      if(!result) {
        return;
      }
      const response = await axios.post('/api/checkout', {
        amount
      })
      const { data } = response;
      router.push(`/checkout?amount=${data.order.amount}&order_id=${data.order.id}&product_sku=${sku}&quantity=${quantity}&price=${price}&totalPrice=${totalPrice}&user_id=${result}&email=${session?.user?.email}`)
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className='grid grid-cols-2 gap-3 px-4'>

      <AddCart email={session?.user?.email}  sku={sku} />
      <Button onClick={checkout} className="bg-Primary text-white" >
        Buy now
      </Button>
    </div>
  )
}

export default CtaButton