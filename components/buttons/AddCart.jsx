import React from 'react'
import { Button } from '../ui/button'
import axios from 'axios'
import { useToast } from '../ui/use-toast'

function AddCart({sku, email}) {
    const {toast} = useToast()
    const addCart = async () => {
        console.log(sku, email)
        try {
            const res = await axios.post('/api/update-user', {
                email,
                data: {sku},
                type: 'cart'
            })
            if(res.data.response.cart) {
                toast({
                    title: 'Product added to cart'
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    }
  return (
   <Button onClick={addCart} className="ring-Primary ring-2 bg-white text-Primary hover:bg-Primary hover:text-white">
    Add Cart
   </Button>
  )
}

export default AddCart