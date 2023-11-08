import { updateProduct } from "@/models/product.model";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { title, price, description, specification, color, images, sku } =
      await req.json();
    // if (
    //   !title ||
    //   !price ||
    //   !description ||
    //   !specification ||
    //   !color ||
    //   !images ||
    //   !sku
    // ) {
    //   return NextResponse.json({
    //     message: `title,
    //     price,
    //     description,
    //     specification,
    //     color or
    //     images is missing`,
    //   });
    // }
      if(!title){
        return NextResponse.json('title is missing')
      }
      if(!price){
        return NextResponse.json('price is missing')
      }
      if(!description){
        return NextResponse.json('description is missing')
      }
      if(!specification){
        return NextResponse.json('specification is missing')
      }
      if(!color){
        return NextResponse.json('color is missing')
      }
      if(!images){
        return NextResponse.json('images is missing')
      }
      if(!sku){
        return NextResponse.json('sku is missing')
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
