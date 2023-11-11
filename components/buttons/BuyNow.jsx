'use client'

import { Button } from "../ui/button";

function BuyNow({
    amount,
    order_id,
    product_sku,
    quantity,
    price,
    totalPrice,
    user_id,
    email
}
) {
    console.log(amount,
        order_id,
        product_sku,
        quantity,
        price,
        totalPrice,
        user_id,
        email)
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
            key: process.env.RAZORPAY_KEY,
            name: "WinHome Wooden Furnitures",
            currency: "INR",
            amount: parseInt(quantity * price),
            order_id: order_id,
            description: "Thankyou for purchasing our product!",
            image:
                "https://ashok-interiors.vercel.app/_next/image?url=%2Fmainlogo.png&w=750&q=75",
            handler: async function (response) {
                const { razorpay_payment_id, razorpay_signature } =
                    response;
                const quantity = parseInt(quantity)
                const price = parseInt(price)
                const totalPrice = parseInt(totalPrice)
                const order = await axios.post('/api/create-order', {
                    product_sku,
                    quantity,
                    price,
                    totalPrice,
                    razorpay_payment_id,
                    razorpay_signature,
                    user_id,
                    email
                })
                console.log(order)
            },
        };
        const paymentObject = await new window.Razorpay(options);
        paymentObject.open();
    };

    return (
        <Button onClick={makePayment}>
            Buy Now
        </Button>
    )
}

export default BuyNow