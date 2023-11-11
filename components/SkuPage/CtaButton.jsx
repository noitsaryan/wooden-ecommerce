'use client'
import React from 'react'
import { Button } from "@nextui-org/react";
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useToast } from "../ui/use-toast"

const CtaButton = ({ amount, price, totalPrice, sku }) => {
  const router = useRouter()
  const [userId, setUserId] = useState('')
  const { data: session } = useSession()
  const { toast } = useToast()
  const userData = async () => {
    const email = session?.user?.email;
    const order = false
    if (!email) {
      toast({
        title: 'Please log in to continue - Redirecting to login page'
      })
      return;
    }
    const res = await axios.post('/api/get-user-by-id', {
      email,
      order
    })
    setUserId(res.data.res._id)
    return res;
  }
  const checkout = async () => {
    try {
      const response = await axios.post('/api/checkout', {
        amount
      })
      const { data } = response;
      router.push(`/checkout?amount=${data.order.amount}&order_id=${data.order.id}&product_sku=${sku}&quantity=${5}&price=${price}&totalPrice=${totalPrice}&user_id=${userId}&email=${session?.user?.email}`)
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    userData()
  }, [])
  return (
    <div className='grid grid-cols-2 gap-3 px-4'>

      <Button color="primary" variant="bordered" className=" h-12 rounded-md border border-Primary">
        Add to cart
      </Button>
      <Button onClick={() => {
        const out = userData()
        if (!out) {
          checkout();
        }
      }} className="bg-Primary h-12 rounded-md border border-Primary" >
        Buy now
      </Button>
    </div>
  )
}

export default CtaButton