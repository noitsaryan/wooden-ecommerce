import { createOrder } from "@/models/order.model";
import { connectDB } from "@/utils/db";
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
    } = await req.json();

    if (
      !product_sku ||
      !quantity ||
      !price ||
      !totalPrice ||
      !user_id ||
      !payment_id ||
      !signature
    ) {
      return NextResponse.json({
        message:
          "Product_sku, quantity, price, totalPrice, payment_id, signature or user_id is missing",
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
