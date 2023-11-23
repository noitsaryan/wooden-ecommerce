import { getProductsForCard } from "@/models/product.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const product = await getProductsForCard();

    const response = NextResponse.json(product);
    response.headers.set("Cache-Control", "no-cache");

    return response;
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
