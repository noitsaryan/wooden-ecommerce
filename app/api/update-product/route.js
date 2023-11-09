import { updateProduct } from "@/models/product.model";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const {
      sku,
      title,
      price,
      description,
      specification,
      color,
      images,
      size,
      warranty,
      maintenance,
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
    const res = await updateProduct(
      title,
      price,
      description,
      specification,
      color,
      images,
      sku,
      size,
      warranty,
      maintenance
    );
    return NextResponse.json({
      data: res,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
