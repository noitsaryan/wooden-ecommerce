import { createProduct } from "@/models/product.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      title,
      price,
      sku,
      description,
      specification,
      color,
      images,
      category,
      subCategory,
    } = await req.json();
    await connectDB();
    const response = await createProduct(
      title,
      price,
      sku,
      description,
      specification,
      color,
      images,
      category,
      subCategory
    );
    return NextResponse.json({
      response,
    });
  } catch (error) {
    return NextResponse.json({
      messageh: error.message,
    });
  }
}
