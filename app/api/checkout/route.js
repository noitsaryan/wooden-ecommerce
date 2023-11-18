import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req) {
  try {
    await connectDB();

    const { amount } = await req.json();
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
    };
    const order = await new instance.orders.create(options);
    return NextResponse.json({
        order
    })
  } catch (error) {
    return NextResponse.json({message: error.message})
  }
}
