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

export async function POST(req) {
  try {
    const {index, quantity} = await req.json()
    
    if(!index || !quantity) return NextResponse.json({
      message: 'Index or quantity not defined',
      success: false
    })
    
    await connectDB();

    const product = await getProductsForCard(index, quantity);

    const response = NextResponse.json(product);
    response.headers.set("Cache-Control", "no-cache");

    return response;
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
