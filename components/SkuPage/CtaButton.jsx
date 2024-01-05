'use client'
import React from 'react'
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useToast } from "../ui/use-toast"
import AddCart from '../buttons/AddCart';
import { Button } from '@nextui-org/react'
import { FormatTextdirectionLToRRounded } from '@mui/icons-material'


const CtaButton = ({ amount, price, totalPrice, sku, quantity }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const { toast } = useToast()

  const checkout = async () => {
    try {
      const emailId = session?.user?.email

      const res = await axios.post('/api/get-user-by-id', {
        user: emailId,
        order: false
      })
      if(!res){
        return toast({
          title: 'Please login to continue'
        })
      }
      const response = await axios.post('/api/checkout', {
        amount
      })
      const { data } = response;
      router.replace(`/checkout?amount=${data.order.amount}&order_id=${data.order.id}&product_sku=${sku}&quantity=${quantity}&price=${price}&totalPrice=${totalPrice}&user_id=${res.data.res.data._id}&email=${session?.user?.email}`)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='grid grid-cols-2 gap-3 px-4'>

      <AddCart email={session?.user?.email} sku={sku} />
      <Button onClick={checkout} className="bg-Primary text-white" >
        Buy now
      </Button>
    </div>
  )
}

export default CtaButton