import { getProductByCategory } from "@/models/product.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { type } = await req.json();
    console.log(type)
    const res = await getProductByCategory(type);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
