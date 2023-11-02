import { updateOrderStates } from "@/models/order.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { order_id, stage, message } = await req.json();
    if(!order_id || !stage || !message){
        return NextResponse.json({message: 'order_id, stage or message is missing'})
    }
    await connectDB();
    const res = await updateOrderStates(order_id, stage, message);
    return NextResponse.json({res})
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
