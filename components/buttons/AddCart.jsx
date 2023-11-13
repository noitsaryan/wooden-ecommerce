import React from 'react'

import axios from 'axios'
import { useToast } from '../ui/use-toast'
import { Button } from '@nextui-org/react'

function AddCart({sku, email}) {
    const {toast} = useToast()
    const addCart = async () => {
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
   <Button onClick={addCart} variant='bordered' className="border-Primary text-Primary" >
    Add Cart
   </Button>
  )
}

export default AddCart