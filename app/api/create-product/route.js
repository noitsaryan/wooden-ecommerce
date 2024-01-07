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
      size,
      warranty,
      maintenance,
      isMadeToOrder
    } = await req.json();
    if (!title) {
      return NextResponse.json("title is missing");
    }
    if (!price) {
      return NextResponse.json("price is missing");
    }
    if (!description) {
      return NextResponse.json("description is missing");
    }
    if (!specification) {
      return NextResponse.json("specification is missing");
    }
    if (!color) {
      return NextResponse.json("color is missing");
    }
    if (!images) {
      return NextResponse.json("images is missing");
    }
    if (!sku) {
      return NextResponse.json("sku is missing");
    }
    if (!size) {
      return NextResponse.json("size is missing");
    }
    if (!warranty) {
      return NextResponse.json("warranty is missing");
    }
    if (!maintenance) {
      return NextResponse.json("maintenance is missing");
    }
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
      subCategory,
      size,
      warranty,
      maintenance, 
      isMadeToOrder
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
