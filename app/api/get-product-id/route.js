import { getProductBySKU } from "@/models/product.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { sku } = await req.json();
    await connectDB()
    const res = await getProductBySKU(sku);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
