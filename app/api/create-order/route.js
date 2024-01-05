import { createOrder } from "@/models/order.model";
import { connectDB } from "@/utils/db";
import { sendMail } from "@/utils/services/mail";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const {
      product_sku,
      quantity,
      price,
      totalPrice,
      payment_id,
      signature,
      user_id,
      email,
    } = await req.json();

    const res = await createOrder(
      product_sku,
      quantity,
      price,
      totalPrice,
      payment_id,
      signature,
      user_id
    );

    await sendMail(
      `New Order`,
      email,
      `ORder Details: SKU: ${product_sku},<br/> Quantity: ${quantity},<br/> Price: ${price},<br/> Total Price: ${totalPrice},<br/> Payment Id: ${payment_id},<br/> Payment Signature: ${signature},<br/> UserId: ${user_id},<br/> Email: ${email} `
    );

    return NextResponse.json(res);
  } catch (error) {
    if (error.message.code === 11000) {
      return error.message;
    }

    return NextResponse.json({
      message: error.message,
    });
  }
}
