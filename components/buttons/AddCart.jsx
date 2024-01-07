import React from 'react'
import axios from 'axios'
import { useToast } from '../ui/use-toast'
import { Button } from '@nextui-org/react'

function AddCart({ sku, email }) {
    const { toast } = useToast();
    const addCart = async () => {
        try {
            axios.get('/api/get-current-user').then((e) => {
                if (!e.data.success) {
                    toast({
                        title: 'Please login to continue'
                    })
                    return;
                }
                axios.post('/api/update-user', {
                    email: e.data.data.email,
                    data: { sku },
                    type: 'cart'
                }).then((res) => {
                    if (res.data.response) {
                        toast({
                            title: 'Product added to cart'
                        })
                    }
                })
            })
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