import { fetchOrders } from "@/models/order.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, index, quantity } = await req.json();
    const data = await fetchOrders(email, index, quantity);

    if (!data.success)
      return NextResponse.json({
        message: data.message,
      });

    return NextResponse.json({
      data: data.data,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
