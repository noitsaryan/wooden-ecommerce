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

    if (
      !product_sku ||
      !quantity ||
      !price ||
      !totalPrice ||
      !user_id ||
      !payment_id ||
      !signature ||
      !email
    ) {
      return NextResponse.json({
        message:
          "Product_sku, quantity, price, totalPrice, payment_id, signature, email or user_id is missing",
      });
    }

    if (price < 0 || totalPrice < 0 || quantity < 0) {
      return NextResponse.json({
        message: "Price, Total Price or Quantity is less than 0",
      });
    }

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
      `ORder Details: SKU: ${product_sku}, Quantity: ${quantity}, Price: ${price}, Total Price: ${totalPrice}, Payment Id: ${payment_id}, Payment Signature: ${signature}, UserId: ${user_id}, Email: ${email} `
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
