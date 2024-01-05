'use client'
import { createOrder } from "@/actions/payment";
import { Button } from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";

function BuyNow({
    order_id,
    product_sku,
    quantity,
    price,
    user_id,
    email,
    style,
    disabled,
    totalPrice,
    fields
}
) {
    const updateUserData = async () => {
        try {
            const { shipping, billing, gst, phone } = fields
            const address = { shipping_address: shipping, billing_address: billing }
            const user = await axios.post('/api/update-user', {
                email,
                data: address,
                type: 'address'
            })
            const gst_no = await axios.post('/api/update-user', {
                email,
                data: gst,
                type: 'gst'
            })
            const phone_no = await axios.post('/api/update-user', {
                email,
                data: phone,
                type: 'phone'
            })
            if (user.data === 'Success' && gst_no.data === 'Success' && phone_no.data === 'Success') {
                return toast({
                    title: 'Success'
                })
            }
        } catch (error) {
            console.error(error)
        }
    }
    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };

    const makePayment = async () => {
        const res = await initializeRazorpay();

        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }

        const options = {
            key: 'rzp_test_04gBM2iE6jqZz5',
            name: "Ashofy",
            currency: "INR",
            amount: parseInt(quantity * price),
            order_id: order_id,
            description: "Thankyou for purchasing our product!",
            handler: async function (response) {
                const { razorpay_payment_id, razorpay_signature } =
                    response;
                const Quantity = parseInt(quantity)
                const Price = parseInt(price)
                const tPrice = parseInt(totalPrice)
                const order = await axios.post('/api/create-order', {
                    product_sku,
                    quantity: Quantity,
                    price: Price,
                    totalPrice: tPrice,
                    payment_id: razorpay_payment_id,
                    signature: razorpay_signature,
                    user_id,
                    email
                })
                if (!order) {
                    toast.error("Order not placed")
                }
                toast.success("Successfully placed the order")
            },
        };
        const paymentObject = await new window.Razorpay(options);
        paymentObject.open();
    };

    return (
        <Button disabled={disabled} className={`bg-Primary  text-white ${style}`} onClick={() => {
            makePayment();
            updateUserData()
        }}>
            Buy Now
        </Button>
    )
}

export default BuyNow