import { updateProduct } from "@/models/product.model";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { title, price, description, specification, color, images, sku } =
      await req.json();
    if (
      !title ||
      !price ||
      !description ||
      !specification ||
      !color ||
      !images ||
      !sku
    ) {
      return NextResponse.json({
        message: `title,
        price,
        description,
        specification,
        color or
        images is missing`,
      });
    }
    const res = await updateProduct(
      title,
      price,
      description,
      specification,
      color,
      images,
      sku
    );
    return NextResponse.json({
        data:res
    })
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
