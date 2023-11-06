'use client'

import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

function Checkout({ amount }) {
    const router = useRouter()
    const {data:session} = useSession()
    const checkout = async (amount) => {
        try {
            const response = await axios.post('/api/checkout', {
                amount
            })
            const { data } = response;
            router.push(`/checkout?amount=${data.order.amount}&order_id=${data.order.id}&product_sku=${'AKIN001'}&quantity=${5}&price=${15000}&totalPrice=${75000}&user_id=${'6541f6cd7f602b7f644d1712'}&email=${session?.user?.email}`)
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <button onClick={() => checkout(amount)}>
            Check Out
        </button>
    )
}

export default Checkout