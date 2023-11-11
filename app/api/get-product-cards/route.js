import { getProductsForCard } from "@/models/product.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const product = await getProductsForCard();
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
