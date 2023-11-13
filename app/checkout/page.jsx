"use client";
import BuyNow from "@/components/buttons/BuyNow";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { storage } from "@/appwrite/appwrite.config";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@nextui-org/react";

function page() {
  const params = useSearchParams();
  const amount = params.get("amount");
  const order_id = params.get("order_id");
  const product_sku = params.get("product_sku");
  const quantity = params.get("quantity");
  const price = params.get("price");
  const totalPrice = params.get("totalPrice");
  const user_id = params.get("user_id");
  const email = params.get("email");
  const [image, setImage] = useState("");
  const [user, setUser] = useState();
  const [response, setResponse] = useState({});
  const [check, setCheck] = useState({});
  const [fields, setFields] = useState({
    shipping: String, gst: Number, phone: Number, billing: String
  })
  const { shipping, billing, gst, phone } = fields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev, [name]: value
    }))
  }

  const fetchUser = async () => {
    try {
      const user = await axios.post('/api/get-user-by-id', {
        user: email, order: false
      })
      setFields({
        shipping: user.data?.res?.address.shipping_address,
        billing: user.data?.res?.address.shipping_address,
        gst: user.data?.res?.gst_no,
        phone: user.data?.res?.phone_no
      })
    } catch (error) {
      console.error(error.message)
    }
  }

  const fetchProduct = async () => {
    try {
      const product = await axios.post('/api/get-product-id', {
        sku: product_sku
      })
      setResponse(product.data)
      const imageLink = storage.getFilePreview('65477266d57cd5b74b8c', product.data?.images?.[0])
      const updatedImage = imageLink.href.replace('/preview?', '/view?')
      setImage(updatedImage)

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchProduct()
    fetchUser();
  }, [])

  return (
    <main className=" flex md:flex-row flex-col items-start gap-4 p-4">
      <section className="flex flex-col-reverse gap-4 w-full sm:w-4/12">
        <div className="bg-gray-50 p-8 space-y-3 border">
          <h1 className="text-xl font-semibold uppercase"> Price Details </h1>
          <hr />
          <h1 className="font-semibold"> Price: Rs {parseInt(price).toLocaleString()} </h1>
          <hr />
          <h1 className="font-semibold"> Quantity: {quantity} </h1>
          <hr />
          <h1 className="font-semibold"> Total Payable: Rs {parseInt(totalPrice).toLocaleString()}  </h1>
          <BuyNow
            order_id={order_id}
            product_sku={product_sku}
            quantity={quantity}
            price={price}
            user_id={user_id}
            email={email}
            style="w-full rounded-sm" disabled={!shipping || !phone ? true : false} fields={fields} />
        </div>
        <div className="bg-gray-50 border p-3 space-y-3">
          <h1 className="text-lg font-semibold uppercase">Order Summary</h1>
          <hr />
          <div className="flex items-start gap-2 p-2">
            <Image priority src={image} width={120} height={120} alt="product_image" />
            <div>
              <h1 className="font-medium text-lg"> {response.title} </h1>
              <h1 className="opacity-70"> SKU: <span className="uppercase">{response.sku}</span> </h1>
            </div>
          </div>
        </div>
      </section>
      <section className="sm:w-8/12 w-full">
        <div>
          <div className="bg-gray-50 border p-2">
            <h1 className="text-xl font-semibold">Delivery & Billing Address</h1>
          </div>
          <div className="space-y-3 py-3">
            <div className="space-y-2 bg-gray-50 p-3 border">
              <label htmlFor="shipping" className="text-sm text-Primary">Shipping Address*</label>
              <Input placeholder=" Shipping Address" name="shipping" onChange={handleChange} value={shipping} />
              <label htmlFor="phone" className="text-sm text-Primary">Mobile Number*</label>
              <Input type="number" placeholder=" Mobile Number" name="phone" onChange={handleChange} value={phone} />
            </div>
            <div className="space-y-2 bg-gray-50 p-3 border">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" onChange={(e) => setCheck(e.target.checked)}  />
                <p> Buying For Your Business? </p>
              </div>
              <label htmlFor="shipping" className="text-sm text-Primary">Billing Address*</label>
              <Input disabled={check? false : true} placeholder=" Billing Address" name="billing" onChange={handleChange} value={billing} />
              <label htmlFor="shipping" className="text-sm text-Primary">GST No*</label>
              <Input disabled={check? false : true} placeholder=" GST Number" name="gst" onChange={handleChange} value={gst} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;