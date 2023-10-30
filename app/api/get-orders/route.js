import { getAllOrders } from "@/models/order.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const res = await getAllOrders();
    return NextResponse.json(res)
  } catch (error) {
    return error.message
  }
}   
