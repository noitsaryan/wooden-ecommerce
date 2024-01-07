'use client'
import React from 'react'
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "../ui/use-toast"
import AddCart from '../buttons/AddCart';
import { Button } from '@nextui-org/react'


const CtaButton = ({ amount, price, totalPrice, sku, quantity }) => {
  const router = useRouter()
  const { toast } = useToast()

  const checkout = async () => {
    try {
      const response = await axios.post('/api/checkout', {
        amount
      })
      const { data } = response;

      axios.get("/api/get-current-user").then((e) => {
        if (!e.data.success) {
          toast({
            title: 'Please login to continue'
          })
          return;
        }
        router.replace(`/checkout?amount=${data.order.amount}&order_id=${data.order.id}&product_sku=${sku}&quantity=${quantity}&price=${price}&totalPrice=${totalPrice}&user_id=${e.data.data._id}&email=${e.data.data.email}`)
      })

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='grid grid-cols-2 gap-3 px-4'>

      <AddCart sku={sku} />
      <Button onClick={checkout} className="bg-Primary text-white" >
        Buy now
      </Button>
    </div>
  )
}

export default CtaButton